const express                                  = require('express');
const graphqlHttp                              = require('express-graphql');
const {
    getVideoById, getVideos, createVideo } = require('./data/index');
const server                                   = express();
const port                                     = process.env.PORT || 3000;

const {
          GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLBoolean, GraphQLID
      } = require('graphql');

const videoType = new GraphQLObjectType({
    name        : 'video',
    description : 'A video on Egghead.io',
    fields      : {
        id       : {
            type        : GraphQLID,
            description : 'The id of the video'
        },
        title    : {
            type        : GraphQLString,
            description : 'The title of the video'
        },
        duration : {
            type        : GraphQLInt,
            description : 'The duration of the video'
        },
        watched  : {
            type        : GraphQLBoolean,
            description : 'Whether or no the viewer watched the video'
        }
    }
});

const mutationType = new GraphQLObjectType({
                                           name        : 'Mutation',
                                           description : 'The root Mutation type',
                                           fields      : {
                                               createVideo : {
                                                   type    : videoType,
                                                   args    : {
                                                       title    : {
                                                           type        : new GraphQLNonNull(GraphQLID),
                                                           description : 'The title of the video'
                                                       },
                                                       duration : {
                                                           type        : new GraphQLNonNull(GraphQLInt),
                                                           description : 'The duration of the video'
                                                       },
                                                       watched  : {
                                                           type : new GraphQLNonNull(GraphQLBoolean)
                                                       }
                                                   },
                                                   resolve : (_, args) => {
                                                       return createVideo(args)
                                                   }
                                               }
                                           }
                                       });

const queryType = new GraphQLObjectType({
    name        : 'QueryType',
    description : 'The root query type',
    fields      : {
        videos : {
            type    : new GraphQLList(videoType),
            resolve : getVideos
        },
        video  : {
            type    : videoType,
            args    : {
                id : {
                    type        : new GraphQLNonNull(GraphQLID),
                    description : 'The id of the video'
                }
            },
            resolve : (_, args) => getVideoById(args.id)
        }
    }
});

const schema = new GraphQLSchema({
    query    : queryType,
    mutation : mutationType
});

server.use('/graphql', graphqlHttp({
                                       schema,
                                       graphiql : true, // use graphiql interface
                                   }));

server.listen(port, () => {
    console.log(`Listening on http`)
})