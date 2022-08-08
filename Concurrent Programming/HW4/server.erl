-module(server).

-export([start_server/0]).

-include_lib("./defs.hrl").

-spec start_server() -> _.
-spec loop(_State) -> _.
-spec do_join(_ChatName, _ClientPID, _Ref, _State) -> _.
-spec do_leave(_ChatName, _ClientPID, _Ref, _State) -> _.
-spec do_new_nick(_State, _Ref, _ClientPID, _NewNick) -> _.
-spec do_client_quit(_State, _Ref, _ClientPID) -> _NewState.

start_server() ->
    catch(unregister(server)),
    register(server, self()),
    case whereis(testsuite) of
	undefined -> ok;
	TestSuitePID -> TestSuitePID!{server_up, self()}
    end,
    loop(
      #serv_st{
	 nicks = maps:new(), %% nickname map. client_pid => "nickname"
	 registrations = maps:new(), %% registration map. "chat_name" => [client_pids]
	 chatrooms = maps:new() %% chatroom map. "chat_name" => chat_pid
	}
     ).

loop(State) ->
    receive 
	%% initial connection
	{ClientPID, connect, ClientNick} ->
	    NewState =
		#serv_st{
		   nicks = maps:put(ClientPID, ClientNick, State#serv_st.nicks),
		   registrations = State#serv_st.registrations,
		   chatrooms = State#serv_st.chatrooms
		  },
	    loop(NewState);
	%% client requests to join a chat
	{ClientPID, Ref, join, ChatName} ->
	    NewState = do_join(ChatName, ClientPID, Ref, State),
	    loop(NewState);
	%% client requests to join a chat
	{ClientPID, Ref, leave, ChatName} ->
	    NewState = do_leave(ChatName, ClientPID, Ref, State),
	    loop(NewState);
	%% client requests to register a new nickname
	{ClientPID, Ref, nick, NewNick} ->
	    NewState = do_new_nick(State, Ref, ClientPID, NewNick),
	    loop(NewState);
	%% client requests to quit
	{ClientPID, Ref, quit} ->
	    NewState = do_client_quit(State, Ref, ClientPID),
	    loop(NewState);
	{TEST_PID, get_state} ->
	    TEST_PID!{get_state, State},
	    loop(State)
    end.

%% executes join protocol from server perspective
do_join(ChatName, ClientPID, Ref, State) ->
	{ok, Nick} = maps:find(ClientPID,State#serv_st.nicks),
	case maps:find(ChatName,State#serv_st.chatrooms) of
		{ok, PID} ->
			PID!{self(), Ref, register, ClientPID, Nick},
			{ok, List} = maps:find(ChatName,State#serv_st.registrations),
			#serv_st{
				nicks = State#serv_st.nicks,
				registrations = maps:put(ChatName,[ClientPID]++List,State#serv_st.registrations),
				chatrooms = State#serv_st.chatrooms
			};
		error ->
			PID = spawn(chatroom, start_chatroom, [ChatName]),
			PID!{self(), Ref, register, ClientPID, Nick},
			#serv_st{
				nicks = State#serv_st.nicks,
				registrations = maps:put(ChatName, [ClientPID], State#serv_st.registrations),
				chatrooms = maps:put(ChatName, PID, State#serv_st.chatrooms)
			}
	end.

%% executes leave protocol from server perspective
do_leave(ChatName, ClientPID, Ref, State) ->
	PID = maps:get(ChatName, State#serv_st.chatrooms),
	NState = State#serv_st{
		nicks = State#serv_st.nicks,
		registrations = maps:update(ChatName, lists:delete(ClientPID, maps:get(ChatName, State#serv_st.registrations)), State#serv_st.registrations),
		chatrooms = State#serv_st.chatrooms},
	PID!{self(), Ref, unregister, ClientPID},
	ClientPID!{self(), Ref, ack_leave},
	NState.

%%helper function tells chatroom name change
new_nick_helper(Ref, ClientPID, Nick, Map, List) ->
	if List == [] -> ok;
		true ->
	[{K,V} | T] = List,
	case lists:member(ClientPID,V) of
		true -> maps:get(K,Map)!{self(),Ref, update_nick, ClientPID,Nick},
			new_nick_helper(Ref, ClientPID, Nick, Map,T);
		false -> new_nick_helper(Ref, ClientPID, Nick, Map, T)
	end
end.
%% executes new nickname protocol from server perspective
do_new_nick(State, Ref, ClientPID, NewNick) ->
	case lists:member(NewNick, maps:values(State#serv_st.nicks)) of
		%%errors if nickname is same as other user
		true -> ClientPID!{self(), Ref, err_nick_used},
			State;
		false ->
			NState = #serv_st{
				nicks = maps:put(ClientPID, NewNick, State#serv_st.nicks),
				registrations = State#serv_st.registrations,
				chatrooms = State#serv_st.chatrooms},
			new_nick_helper(Ref, ClientPID, NewNick, State#serv_st.chatrooms, maps:to_list(State#serv_st.registrations)),
			ClientPID!{self(), Ref, ok_nick}, NState
	end.

%% executes client quit protocol from server perspective
do_client_quit(State, Ref, ClientPID) ->
	  R = maps:map(fun(X,Y) when is_list(X) ->
			lists:delete(ClientPID, Y) end, State#serv_st.registrations),
		lists:map(fun(X) -> quit_helper(State, Ref, ClientPID, X) end, maps:keys(State#serv_st.chatrooms)),
		ClientPID!{self(), Ref, ack_quit},
		State#serv_st{
			nicks=maps:remove(ClientPID, State#serv_st.nicks), registrations = R
		}.

%this finds current state of chatroom
quit_helper(State, Ref, ClientPID, ChatroomName) ->
			case maps:find(ChatroomName, State#serv_st.registrations) of
				{ok, ClientPIDs}->
					case lists:any(fun(X)->
						X==ClientPID end, ClientPIDs) of
						true-> case maps:find(ChatroomName, State#serv_st.chatrooms) of
										 {ok, ChatroomPID} -> ChatroomPID!{self(), Ref, unregister, ClientPID}
									 end;
						false -> pass
					end

			end.
