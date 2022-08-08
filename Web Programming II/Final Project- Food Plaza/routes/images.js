const express = require('express');
const router = express.Router();
const data = require('../data');
const imageData = data.images
const bluebird = require('bluebird');
const redis = require('redis');
const xss = require('xss');
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/:id', async (req,res) =>{
    try{
        let id = xss(req.params.id);
        if((typeof(id) !== 'string') || (id.trim().length === 0)) throw 'must supply id';
        let image = await client.hgetAsync('images', id);
        if(!image){
            image = await imageData.getImage(id);
            image = image.imageString;
            await client.hsetAsync('images', id, image);
        }
        res.json(image)
    }catch(e){
        res.status(404).json({error:e.toString()});
    }
});

module.exports = router;
