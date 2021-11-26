import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://graph.dedrops.xyz/v1/graphql`;


const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    'content-type': `application/json`,
    'x-hasura-admin-secret': 'df8UEfMjqN6apt'
  }
});

export function useGetProjectData() {
  return useQuery("get-project-data-by-day", async () => {

    // 注意 project_data_by_day 要跟 hasura 定义的 query name 一致
    const { project_data_by_day } = await graphQLClient.request(gql`
    query MyQuery {
        project_data_by_day(where: {project_id: {_eq: "icp123"}, event_date: {_gt: "2021-08-05", _lte: "2021-09-10"}}) {
          count
          event_date
          project_id
        }
      }
      
    `);
    return project_data_by_day;
  });
}

export function useGetProject(projectId) {
    return useQuery(["get-project-data",projectId], async () => {
  
      // 注意 project_data_by_day 要跟 hasura 定义的 query name 一致
      const { project_data_by_day } = await graphQLClient.request(gql`
      query MyQuery($projectId:String!) {
        project_data_by_day(where: {project_id: {_eq: $projectId}}) {
          count
          event_date
          project_id
        }
      }
        
      `,{projectId});
      return project_data_by_day;
    });
  }



export function useGetPost(postId) {
  return useQuery(["get-post", postId], async () => {
    const { getPost } = await graphQLClient.request(
      gql`
        query getDate($projectId: String!) {
          getPost(_id: $postId) {
            _id
            content
            description
            title
          }
        }
      `,
      { postId }
    );
    return getPost;
  });
}