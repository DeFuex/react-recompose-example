import React from 'react';
import { gql, graphql } from 'react-apollo';

const RepoQuery : Function = gql`
query RepoQuery($owner: String!, $repo: String!, $commitsNumber: Int!) {
    github {
    repo(ownerUsername: $owner, name: $repo) {
        commits(limit: $commitsNumber) {
        sha
        message
        }
    }
    }
}`;

const internalHoc = graphql(RepoQuery, {
    options: props => ({
        variables: {
            owner: props.match.params.owner,
            repo: props.match.params.repo,
            commitsNumber: parseInt(props.location.state.commitsNumber)
        }
    }) 
})

export default function withRequestToGithub(Component){

    return class RequestHoC extends React.Component {

        state = {
            owner: null,
            repo: null,
            commitsNumber: null,
            variables: {}
        };

        wrapped = internalHoc(Component)

        render() {
            // console.log(this.res);
            const { commitsNumber } = this.props.location.state;
            const Wrapped = this.wrapped;
            
            return (
                <Wrapped
                    owner={this.props.match.params.owner}
                    repo={this.props.match.params.repo}
                    commitsNumber={this.props.location.state.commitsNumber}
                    {...this.props}
                />
                // , console.log(this.props.match.params.owner)
            );
        };
    }
}