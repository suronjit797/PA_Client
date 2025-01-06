/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query getProfile {\n    profile {\n      name\n      email\n      role\n    }\n  }\n": types.GetProfileDocument,
    "\n  mutation Login($body: LoginInput) {\n    login(body: $body) {\n      accessToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation RegisterUser($body: CreateUserInput!) {\n    register(body: $body) {\n      _id\n      name\n    }\n  }\n": types.RegisterUserDocument,
    "\n  query UsersList($pagination: PaginationInput, $query: UserQuery) {\n    users(pagination: $pagination, query: $query) {\n      meta {\n        page\n        limit\n        total\n      }\n      data {\n        _id\n        name\n        email\n        role\n      }\n    }\n  }\n": types.UsersListDocument,
    "\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation UpdateUser($id: ID!, $body: UpdateUserInput) {\n    updateUser(id: $id, body: $body) {\n      name\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getProfile {\n    profile {\n      name\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  query getProfile {\n    profile {\n      name\n      email\n      role\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($body: LoginInput) {\n    login(body: $body) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($body: LoginInput) {\n    login(body: $body) {\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterUser($body: CreateUserInput!) {\n    register(body: $body) {\n      _id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($body: CreateUserInput!) {\n    register(body: $body) {\n      _id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UsersList($pagination: PaginationInput, $query: UserQuery) {\n    users(pagination: $pagination, query: $query) {\n      meta {\n        page\n        limit\n        total\n      }\n      data {\n        _id\n        name\n        email\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  query UsersList($pagination: PaginationInput, $query: UserQuery) {\n    users(pagination: $pagination, query: $query) {\n      meta {\n        page\n        limit\n        total\n      }\n      data {\n        _id\n        name\n        email\n        role\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($deleteUserId: ID!) {\n    deleteUser(id: $deleteUserId) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($id: ID!, $body: UpdateUserInput) {\n    updateUser(id: $id, body: $body) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($id: ID!, $body: UpdateUserInput) {\n    updateUser(id: $id, body: $body) {\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;