const {
          GraphQLInterfaceType, GraphQLNonNull, GraphQLID
      }             = require('graphql');
const { videoType } = require('../schema');

const IDInterface = new GraphQLInterfaceType({
    name        : 'IDNode',
    fields      : {
        id : {
            type : new GraphQLNonNull(GraphQLID)
        }
    },
    resolveType : (object) => {
        if( object.title ) {
            return videoType;
        }

        return null;
    }
});

module.exports = IDInterface;
