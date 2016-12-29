const express   = require('express');
const graphqlHttp = require('express-graphql');

const server = express();
const port   = process.env.PORT || 3000;

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Video {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }
    
    type Query {
        video: Video,
        videos: [Video]
    }
    
    type Schema{
        query: Query
    }
`);

const videos = [
    {
        id       : '1',
        title    : 'react',
        duration : 180,
        watched  : true
    },
    {
        id       : '2',
        title    : 'relay',
        duration : 230,
        watched  : false
    }
];

const resolvers = {
    video  : () => ({
        id       : '1',
        title    : 'bar',
        duration : 180,
        watched  : true
    }),
    videos : () => videos
};

server.use('/graphql', graphqlHttp({
                                     schema,
                                     graphiql  : true,
                                     rootValue : resolvers
                                 }));

server.listen(port, () => {
    console.log(`Listening on http`)
})