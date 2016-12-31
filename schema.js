const express   = require('express');
const graphqlHttp = require('express-graphql');

const server = express();
const port   = process.env.PORT || 3000;

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
      } = require('graphql');

const videoType = new GraphQLObjectType({
    name: 'video',
    description: 'A video on Egghead.io',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the video'
        },
        title: {
            type: GraphQLString,
            description: 'The title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or no the viewer watched the video'
        }
    }
})

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields :{
        video: {
            type: videoType,
            resolve: () => {
                return new Promise((resolve) => {
                    resolve({
                        id: 'a',
                        title: 'GraphQL',
                        duration: 180,
                        watched: false })
                })
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType
});

/*
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
};*/

server.use('/graphql', graphqlHttp({
                                     schema,
                                     graphiql  : true, // use graphiql interface
                                 }));

server.listen(port, () => {
    console.log(`Listening on http`)
})