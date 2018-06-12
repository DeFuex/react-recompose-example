import React from 'react';
import { gql, graphql } from 'react-apollo';

export default function withRequestToGithub(Component, data){

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

    // const res = graphql(RepoQuery, {
    //             options: props => ({
    //                 variables: {
    //                     owner: props.match.params.owner,
    //                     repo: props.match.params.repo,
    //                     commitsNumber: parseInt(props.location.state.commitsNumber),
    //                     loading: props.data.loading
    //                 }
    //             })
    //         });

    const fetchData = async () => {
        this.setState({ loading: true });
        const result = await graphql(RepoQuery, {
            options: props => ({
                variables: {
                    owner: this.props.match.params.owner,
                    repo: this.props.match.params.repo,
                    commitsNumber: parseInt(this.props.location.state.commitsNumber)
                }
            }) 
        }) 
    };

    return class RequestHoC extends React.Component {

        state = {
            loading: false,
            owner: null,
            repo: null,
            commitsNumber: null,
            variables: {}
        };

        componentDidMount() {
            this.fetchData();
        }

        render() {
            console.log(this.props);
            // console.log(this.res);
            const { commitsNumber } = this.props.location.state;
            console.log(commitsNumber);
            
            return (
                <Component
                    data={() => this.fetchData(this.props)}
                    // variables={this.state.variables}
                    owner={this.props.match.params.owner}
                    repo={this.props.match.params.repo}
                    commitsNumber={this.props.location.state.commitsNumber}
                    loading={this.state.loading}
                    {...this.props}
                />
                // , console.log(this.props.match.params.owner)
            );
        };
    }
}