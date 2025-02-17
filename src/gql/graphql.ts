/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  timestamptz: { input: any; output: any; }
  timetz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "libraflow.m_category" */
export type Libraflow_M_Category = {
  __typename?: 'libraflow_m_category';
  _is_delete: Scalars['Boolean']['output'];
  category_name: Scalars['String']['output'];
  create_date: Scalars['timetz']['output'];
  id: Scalars['uuid']['output'];
  /** An array relationship */
  t_books: Array<Libraflow_T_Book>;
  /** An aggregate relationship */
  t_books_aggregate: Libraflow_T_Book_Aggregate;
  update_date: Scalars['timetz']['output'];
};


/** columns and relationships of "libraflow.m_category" */
export type Libraflow_M_CategoryT_BooksArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Book_Order_By>>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};


/** columns and relationships of "libraflow.m_category" */
export type Libraflow_M_CategoryT_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Book_Order_By>>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};

/** aggregated selection of "libraflow.m_category" */
export type Libraflow_M_Category_Aggregate = {
  __typename?: 'libraflow_m_category_aggregate';
  aggregate?: Maybe<Libraflow_M_Category_Aggregate_Fields>;
  nodes: Array<Libraflow_M_Category>;
};

/** aggregate fields of "libraflow.m_category" */
export type Libraflow_M_Category_Aggregate_Fields = {
  __typename?: 'libraflow_m_category_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Libraflow_M_Category_Max_Fields>;
  min?: Maybe<Libraflow_M_Category_Min_Fields>;
};


/** aggregate fields of "libraflow.m_category" */
export type Libraflow_M_Category_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Libraflow_M_Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "libraflow.m_category". All fields are combined with a logical 'AND'. */
export type Libraflow_M_Category_Bool_Exp = {
  _and?: InputMaybe<Array<Libraflow_M_Category_Bool_Exp>>;
  _is_delete?: InputMaybe<Boolean_Comparison_Exp>;
  _not?: InputMaybe<Libraflow_M_Category_Bool_Exp>;
  _or?: InputMaybe<Array<Libraflow_M_Category_Bool_Exp>>;
  category_name?: InputMaybe<String_Comparison_Exp>;
  create_date?: InputMaybe<Timetz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  t_books?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
  update_date?: InputMaybe<Timetz_Comparison_Exp>;
};

/** unique or primary key constraints on table "libraflow.m_category" */
export enum Libraflow_M_Category_Constraint {
  /** unique or primary key constraint */
  MCategoryPk = 'm_category_pk'
}

/** input type for inserting data into table "libraflow.m_category" */
export type Libraflow_M_Category_Insert_Input = {
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  category_name?: InputMaybe<Scalars['String']['input']>;
  create_date?: InputMaybe<Scalars['timetz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  t_books?: InputMaybe<Libraflow_T_Book_Arr_Rel_Insert_Input>;
  update_date?: InputMaybe<Scalars['timetz']['input']>;
};

/** aggregate max on columns */
export type Libraflow_M_Category_Max_Fields = {
  __typename?: 'libraflow_m_category_max_fields';
  category_name?: Maybe<Scalars['String']['output']>;
  create_date?: Maybe<Scalars['timetz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  update_date?: Maybe<Scalars['timetz']['output']>;
};

/** aggregate min on columns */
export type Libraflow_M_Category_Min_Fields = {
  __typename?: 'libraflow_m_category_min_fields';
  category_name?: Maybe<Scalars['String']['output']>;
  create_date?: Maybe<Scalars['timetz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  update_date?: Maybe<Scalars['timetz']['output']>;
};

/** response of any mutation on the table "libraflow.m_category" */
export type Libraflow_M_Category_Mutation_Response = {
  __typename?: 'libraflow_m_category_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Libraflow_M_Category>;
};

/** input type for inserting object relation for remote table "libraflow.m_category" */
export type Libraflow_M_Category_Obj_Rel_Insert_Input = {
  data: Libraflow_M_Category_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Libraflow_M_Category_On_Conflict>;
};

/** on conflict condition type for table "libraflow.m_category" */
export type Libraflow_M_Category_On_Conflict = {
  constraint: Libraflow_M_Category_Constraint;
  update_columns?: Array<Libraflow_M_Category_Update_Column>;
  where?: InputMaybe<Libraflow_M_Category_Bool_Exp>;
};

/** Ordering options when selecting data from "libraflow.m_category". */
export type Libraflow_M_Category_Order_By = {
  _is_delete?: InputMaybe<Order_By>;
  category_name?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  t_books_aggregate?: InputMaybe<Libraflow_T_Book_Aggregate_Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** primary key columns input for table: libraflow_m_category */
export type Libraflow_M_Category_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "libraflow.m_category" */
export enum Libraflow_M_Category_Select_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  CategoryName = 'category_name',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  UpdateDate = 'update_date'
}

/** input type for updating data in table "libraflow.m_category" */
export type Libraflow_M_Category_Set_Input = {
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  category_name?: InputMaybe<Scalars['String']['input']>;
  create_date?: InputMaybe<Scalars['timetz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  update_date?: InputMaybe<Scalars['timetz']['input']>;
};

/** update columns of table "libraflow.m_category" */
export enum Libraflow_M_Category_Update_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  CategoryName = 'category_name',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  UpdateDate = 'update_date'
}

/** columns and relationships of "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location = {
  __typename?: 'libraflow_m_storage_location';
  _is_delete: Scalars['Boolean']['output'];
  create_date: Scalars['timetz']['output'];
  id: Scalars['uuid']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  storage_location_name: Scalars['String']['output'];
  /** An array relationship */
  t_books: Array<Libraflow_T_Book>;
  /** An aggregate relationship */
  t_books_aggregate: Libraflow_T_Book_Aggregate;
  update_date: Scalars['timetz']['output'];
};


/** columns and relationships of "libraflow.m_storage_location" */
export type Libraflow_M_Storage_LocationT_BooksArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Book_Order_By>>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};


/** columns and relationships of "libraflow.m_storage_location" */
export type Libraflow_M_Storage_LocationT_Books_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Book_Order_By>>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};

/** aggregated selection of "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_Aggregate = {
  __typename?: 'libraflow_m_storage_location_aggregate';
  aggregate?: Maybe<Libraflow_M_Storage_Location_Aggregate_Fields>;
  nodes: Array<Libraflow_M_Storage_Location>;
};

/** aggregate fields of "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_Aggregate_Fields = {
  __typename?: 'libraflow_m_storage_location_aggregate_fields';
  avg?: Maybe<Libraflow_M_Storage_Location_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Libraflow_M_Storage_Location_Max_Fields>;
  min?: Maybe<Libraflow_M_Storage_Location_Min_Fields>;
  stddev?: Maybe<Libraflow_M_Storage_Location_Stddev_Fields>;
  stddev_pop?: Maybe<Libraflow_M_Storage_Location_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Libraflow_M_Storage_Location_Stddev_Samp_Fields>;
  sum?: Maybe<Libraflow_M_Storage_Location_Sum_Fields>;
  var_pop?: Maybe<Libraflow_M_Storage_Location_Var_Pop_Fields>;
  var_samp?: Maybe<Libraflow_M_Storage_Location_Var_Samp_Fields>;
  variance?: Maybe<Libraflow_M_Storage_Location_Variance_Fields>;
};


/** aggregate fields of "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Libraflow_M_Storage_Location_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Libraflow_M_Storage_Location_Avg_Fields = {
  __typename?: 'libraflow_m_storage_location_avg_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "libraflow.m_storage_location". All fields are combined with a logical 'AND'. */
export type Libraflow_M_Storage_Location_Bool_Exp = {
  _and?: InputMaybe<Array<Libraflow_M_Storage_Location_Bool_Exp>>;
  _is_delete?: InputMaybe<Boolean_Comparison_Exp>;
  _not?: InputMaybe<Libraflow_M_Storage_Location_Bool_Exp>;
  _or?: InputMaybe<Array<Libraflow_M_Storage_Location_Bool_Exp>>;
  create_date?: InputMaybe<Timetz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  storage_location_name?: InputMaybe<String_Comparison_Exp>;
  t_books?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
  update_date?: InputMaybe<Timetz_Comparison_Exp>;
};

/** unique or primary key constraints on table "libraflow.m_storage_location" */
export enum Libraflow_M_Storage_Location_Constraint {
  /** unique or primary key constraint */
  MStorageLocationPk = 'm_storage_location_pk'
}

/** input type for incrementing numeric columns in table "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_Inc_Input = {
  index?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_Insert_Input = {
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  create_date?: InputMaybe<Scalars['timetz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  storage_location_name?: InputMaybe<Scalars['String']['input']>;
  t_books?: InputMaybe<Libraflow_T_Book_Arr_Rel_Insert_Input>;
  update_date?: InputMaybe<Scalars['timetz']['input']>;
};

/** aggregate max on columns */
export type Libraflow_M_Storage_Location_Max_Fields = {
  __typename?: 'libraflow_m_storage_location_max_fields';
  create_date?: Maybe<Scalars['timetz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  storage_location_name?: Maybe<Scalars['String']['output']>;
  update_date?: Maybe<Scalars['timetz']['output']>;
};

/** aggregate min on columns */
export type Libraflow_M_Storage_Location_Min_Fields = {
  __typename?: 'libraflow_m_storage_location_min_fields';
  create_date?: Maybe<Scalars['timetz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  storage_location_name?: Maybe<Scalars['String']['output']>;
  update_date?: Maybe<Scalars['timetz']['output']>;
};

/** response of any mutation on the table "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_Mutation_Response = {
  __typename?: 'libraflow_m_storage_location_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Libraflow_M_Storage_Location>;
};

/** input type for inserting object relation for remote table "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_Obj_Rel_Insert_Input = {
  data: Libraflow_M_Storage_Location_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Libraflow_M_Storage_Location_On_Conflict>;
};

/** on conflict condition type for table "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_On_Conflict = {
  constraint: Libraflow_M_Storage_Location_Constraint;
  update_columns?: Array<Libraflow_M_Storage_Location_Update_Column>;
  where?: InputMaybe<Libraflow_M_Storage_Location_Bool_Exp>;
};

/** Ordering options when selecting data from "libraflow.m_storage_location". */
export type Libraflow_M_Storage_Location_Order_By = {
  _is_delete?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  storage_location_name?: InputMaybe<Order_By>;
  t_books_aggregate?: InputMaybe<Libraflow_T_Book_Aggregate_Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** primary key columns input for table: libraflow_m_storage_location */
export type Libraflow_M_Storage_Location_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "libraflow.m_storage_location" */
export enum Libraflow_M_Storage_Location_Select_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  StorageLocationName = 'storage_location_name',
  /** column name */
  UpdateDate = 'update_date'
}

/** input type for updating data in table "libraflow.m_storage_location" */
export type Libraflow_M_Storage_Location_Set_Input = {
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  create_date?: InputMaybe<Scalars['timetz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  storage_location_name?: InputMaybe<Scalars['String']['input']>;
  update_date?: InputMaybe<Scalars['timetz']['input']>;
};

/** aggregate stddev on columns */
export type Libraflow_M_Storage_Location_Stddev_Fields = {
  __typename?: 'libraflow_m_storage_location_stddev_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Libraflow_M_Storage_Location_Stddev_Pop_Fields = {
  __typename?: 'libraflow_m_storage_location_stddev_pop_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Libraflow_M_Storage_Location_Stddev_Samp_Fields = {
  __typename?: 'libraflow_m_storage_location_stddev_samp_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Libraflow_M_Storage_Location_Sum_Fields = {
  __typename?: 'libraflow_m_storage_location_sum_fields';
  index?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "libraflow.m_storage_location" */
export enum Libraflow_M_Storage_Location_Update_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  StorageLocationName = 'storage_location_name',
  /** column name */
  UpdateDate = 'update_date'
}

/** aggregate var_pop on columns */
export type Libraflow_M_Storage_Location_Var_Pop_Fields = {
  __typename?: 'libraflow_m_storage_location_var_pop_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Libraflow_M_Storage_Location_Var_Samp_Fields = {
  __typename?: 'libraflow_m_storage_location_var_samp_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Libraflow_M_Storage_Location_Variance_Fields = {
  __typename?: 'libraflow_m_storage_location_variance_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "libraflow.m_user" */
export type Libraflow_M_User = {
  __typename?: 'libraflow_m_user';
  _is_admin: Scalars['Boolean']['output'];
  _is_delete: Scalars['Boolean']['output'];
  create_date: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  note?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  t_borrow_records: Array<Libraflow_T_Borrow_Record>;
  /** An aggregate relationship */
  t_borrow_records_aggregate: Libraflow_T_Borrow_Record_Aggregate;
  /** An array relationship */
  t_reviews: Array<Libraflow_T_Review>;
  /** An aggregate relationship */
  t_reviews_aggregate: Libraflow_T_Review_Aggregate;
  update_date: Scalars['timestamptz']['output'];
  user_code?: Maybe<Scalars['String']['output']>;
  user_name?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "libraflow.m_user" */
export type Libraflow_M_UserT_Borrow_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Borrow_Record_Order_By>>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};


/** columns and relationships of "libraflow.m_user" */
export type Libraflow_M_UserT_Borrow_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Borrow_Record_Order_By>>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};


/** columns and relationships of "libraflow.m_user" */
export type Libraflow_M_UserT_ReviewsArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Review_Order_By>>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};


/** columns and relationships of "libraflow.m_user" */
export type Libraflow_M_UserT_Reviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Review_Order_By>>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};

/** aggregated selection of "libraflow.m_user" */
export type Libraflow_M_User_Aggregate = {
  __typename?: 'libraflow_m_user_aggregate';
  aggregate?: Maybe<Libraflow_M_User_Aggregate_Fields>;
  nodes: Array<Libraflow_M_User>;
};

/** aggregate fields of "libraflow.m_user" */
export type Libraflow_M_User_Aggregate_Fields = {
  __typename?: 'libraflow_m_user_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Libraflow_M_User_Max_Fields>;
  min?: Maybe<Libraflow_M_User_Min_Fields>;
};


/** aggregate fields of "libraflow.m_user" */
export type Libraflow_M_User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Libraflow_M_User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "libraflow.m_user". All fields are combined with a logical 'AND'. */
export type Libraflow_M_User_Bool_Exp = {
  _and?: InputMaybe<Array<Libraflow_M_User_Bool_Exp>>;
  _is_admin?: InputMaybe<Boolean_Comparison_Exp>;
  _is_delete?: InputMaybe<Boolean_Comparison_Exp>;
  _not?: InputMaybe<Libraflow_M_User_Bool_Exp>;
  _or?: InputMaybe<Array<Libraflow_M_User_Bool_Exp>>;
  create_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  note?: InputMaybe<String_Comparison_Exp>;
  t_borrow_records?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
  t_reviews?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
  update_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_code?: InputMaybe<String_Comparison_Exp>;
  user_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "libraflow.m_user" */
export enum Libraflow_M_User_Constraint {
  /** unique or primary key constraint */
  MUsersPkey = 'm_users_pkey'
}

/** input type for inserting data into table "libraflow.m_user" */
export type Libraflow_M_User_Insert_Input = {
  _is_admin?: InputMaybe<Scalars['Boolean']['input']>;
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  create_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  t_borrow_records?: InputMaybe<Libraflow_T_Borrow_Record_Arr_Rel_Insert_Input>;
  t_reviews?: InputMaybe<Libraflow_T_Review_Arr_Rel_Insert_Input>;
  update_date?: InputMaybe<Scalars['timestamptz']['input']>;
  user_code?: InputMaybe<Scalars['String']['input']>;
  user_name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Libraflow_M_User_Max_Fields = {
  __typename?: 'libraflow_m_user_max_fields';
  create_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  update_date?: Maybe<Scalars['timestamptz']['output']>;
  user_code?: Maybe<Scalars['String']['output']>;
  user_name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Libraflow_M_User_Min_Fields = {
  __typename?: 'libraflow_m_user_min_fields';
  create_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  update_date?: Maybe<Scalars['timestamptz']['output']>;
  user_code?: Maybe<Scalars['String']['output']>;
  user_name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "libraflow.m_user" */
export type Libraflow_M_User_Mutation_Response = {
  __typename?: 'libraflow_m_user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Libraflow_M_User>;
};

/** input type for inserting object relation for remote table "libraflow.m_user" */
export type Libraflow_M_User_Obj_Rel_Insert_Input = {
  data: Libraflow_M_User_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Libraflow_M_User_On_Conflict>;
};

/** on conflict condition type for table "libraflow.m_user" */
export type Libraflow_M_User_On_Conflict = {
  constraint: Libraflow_M_User_Constraint;
  update_columns?: Array<Libraflow_M_User_Update_Column>;
  where?: InputMaybe<Libraflow_M_User_Bool_Exp>;
};

/** Ordering options when selecting data from "libraflow.m_user". */
export type Libraflow_M_User_Order_By = {
  _is_admin?: InputMaybe<Order_By>;
  _is_delete?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  t_borrow_records_aggregate?: InputMaybe<Libraflow_T_Borrow_Record_Aggregate_Order_By>;
  t_reviews_aggregate?: InputMaybe<Libraflow_T_Review_Aggregate_Order_By>;
  update_date?: InputMaybe<Order_By>;
  user_code?: InputMaybe<Order_By>;
  user_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: libraflow_m_user */
export type Libraflow_M_User_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "libraflow.m_user" */
export enum Libraflow_M_User_Select_Column {
  /** column name */
  IsAdmin = '_is_admin',
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  Note = 'note',
  /** column name */
  UpdateDate = 'update_date',
  /** column name */
  UserCode = 'user_code',
  /** column name */
  UserName = 'user_name'
}

/** input type for updating data in table "libraflow.m_user" */
export type Libraflow_M_User_Set_Input = {
  _is_admin?: InputMaybe<Scalars['Boolean']['input']>;
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  create_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  update_date?: InputMaybe<Scalars['timestamptz']['input']>;
  user_code?: InputMaybe<Scalars['String']['input']>;
  user_name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "libraflow.m_user" */
export enum Libraflow_M_User_Update_Column {
  /** column name */
  IsAdmin = '_is_admin',
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  Note = 'note',
  /** column name */
  UpdateDate = 'update_date',
  /** column name */
  UserCode = 'user_code',
  /** column name */
  UserName = 'user_name'
}

/** columns and relationships of "libraflow.t_book" */
export type Libraflow_T_Book = {
  __typename?: 'libraflow_t_book';
  /** 滅失フラグ */
  _is_delete: Scalars['Boolean']['output'];
  /** 著者情報 */
  author?: Maybe<Scalars['String']['output']>;
  /** 図書管理用コード */
  book_code: Scalars['String']['output'];
  /** 登録日時 */
  create_date: Scalars['timestamptz']['output'];
  /** 図書ID（主キー） */
  id: Scalars['uuid']['output'];
  /** ISBNコード */
  isbn_code?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  m_category?: Maybe<Libraflow_M_Category>;
  /** カテゴリID fk m_category */
  m_category_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  m_storage_location?: Maybe<Libraflow_M_Storage_Location>;
  /** 保管場所ID fk m_storage_lacation */
  m_storage_location_id?: Maybe<Scalars['uuid']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  publication_date?: Maybe<Scalars['timestamptz']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  t_borrow_records: Array<Libraflow_T_Borrow_Record>;
  /** An aggregate relationship */
  t_borrow_records_aggregate: Libraflow_T_Borrow_Record_Aggregate;
  /** An array relationship */
  t_reviews: Array<Libraflow_T_Review>;
  /** An aggregate relationship */
  t_reviews_aggregate: Libraflow_T_Review_Aggregate;
  /** タイトル */
  title: Scalars['String']['output'];
  /** 更新日時 */
  update_date: Scalars['timestamptz']['output'];
};


/** columns and relationships of "libraflow.t_book" */
export type Libraflow_T_BookT_Borrow_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Borrow_Record_Order_By>>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};


/** columns and relationships of "libraflow.t_book" */
export type Libraflow_T_BookT_Borrow_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Borrow_Record_Order_By>>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};


/** columns and relationships of "libraflow.t_book" */
export type Libraflow_T_BookT_ReviewsArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Review_Order_By>>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};


/** columns and relationships of "libraflow.t_book" */
export type Libraflow_T_BookT_Reviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Review_Order_By>>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};

/** aggregated selection of "libraflow.t_book" */
export type Libraflow_T_Book_Aggregate = {
  __typename?: 'libraflow_t_book_aggregate';
  aggregate?: Maybe<Libraflow_T_Book_Aggregate_Fields>;
  nodes: Array<Libraflow_T_Book>;
};

/** aggregate fields of "libraflow.t_book" */
export type Libraflow_T_Book_Aggregate_Fields = {
  __typename?: 'libraflow_t_book_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Libraflow_T_Book_Max_Fields>;
  min?: Maybe<Libraflow_T_Book_Min_Fields>;
};


/** aggregate fields of "libraflow.t_book" */
export type Libraflow_T_Book_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "libraflow.t_book" */
export type Libraflow_T_Book_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Libraflow_T_Book_Max_Order_By>;
  min?: InputMaybe<Libraflow_T_Book_Min_Order_By>;
};

/** input type for inserting array relation for remote table "libraflow.t_book" */
export type Libraflow_T_Book_Arr_Rel_Insert_Input = {
  data: Array<Libraflow_T_Book_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Libraflow_T_Book_On_Conflict>;
};

/** Boolean expression to filter rows from the table "libraflow.t_book". All fields are combined with a logical 'AND'. */
export type Libraflow_T_Book_Bool_Exp = {
  _and?: InputMaybe<Array<Libraflow_T_Book_Bool_Exp>>;
  _is_delete?: InputMaybe<Boolean_Comparison_Exp>;
  _not?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
  _or?: InputMaybe<Array<Libraflow_T_Book_Bool_Exp>>;
  author?: InputMaybe<String_Comparison_Exp>;
  book_code?: InputMaybe<String_Comparison_Exp>;
  create_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isbn_code?: InputMaybe<String_Comparison_Exp>;
  m_category?: InputMaybe<Libraflow_M_Category_Bool_Exp>;
  m_category_id?: InputMaybe<Uuid_Comparison_Exp>;
  m_storage_location?: InputMaybe<Libraflow_M_Storage_Location_Bool_Exp>;
  m_storage_location_id?: InputMaybe<Uuid_Comparison_Exp>;
  note?: InputMaybe<String_Comparison_Exp>;
  publication_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  publisher?: InputMaybe<String_Comparison_Exp>;
  t_borrow_records?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
  t_reviews?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  update_date?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "libraflow.t_book" */
export enum Libraflow_T_Book_Constraint {
  /** unique or primary key constraint */
  TBookPk = 't_book_pk'
}

/** input type for inserting data into table "libraflow.t_book" */
export type Libraflow_T_Book_Insert_Input = {
  /** 滅失フラグ */
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** 著者情報 */
  author?: InputMaybe<Scalars['String']['input']>;
  /** 図書管理用コード */
  book_code?: InputMaybe<Scalars['String']['input']>;
  /** 登録日時 */
  create_date?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 図書ID（主キー） */
  id?: InputMaybe<Scalars['uuid']['input']>;
  /** ISBNコード */
  isbn_code?: InputMaybe<Scalars['String']['input']>;
  m_category?: InputMaybe<Libraflow_M_Category_Obj_Rel_Insert_Input>;
  /** カテゴリID fk m_category */
  m_category_id?: InputMaybe<Scalars['uuid']['input']>;
  m_storage_location?: InputMaybe<Libraflow_M_Storage_Location_Obj_Rel_Insert_Input>;
  /** 保管場所ID fk m_storage_lacation */
  m_storage_location_id?: InputMaybe<Scalars['uuid']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  publication_date?: InputMaybe<Scalars['timestamptz']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  t_borrow_records?: InputMaybe<Libraflow_T_Borrow_Record_Arr_Rel_Insert_Input>;
  t_reviews?: InputMaybe<Libraflow_T_Review_Arr_Rel_Insert_Input>;
  /** タイトル */
  title?: InputMaybe<Scalars['String']['input']>;
  /** 更新日時 */
  update_date?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Libraflow_T_Book_Max_Fields = {
  __typename?: 'libraflow_t_book_max_fields';
  /** 著者情報 */
  author?: Maybe<Scalars['String']['output']>;
  /** 図書管理用コード */
  book_code?: Maybe<Scalars['String']['output']>;
  /** 登録日時 */
  create_date?: Maybe<Scalars['timestamptz']['output']>;
  /** 図書ID（主キー） */
  id?: Maybe<Scalars['uuid']['output']>;
  /** ISBNコード */
  isbn_code?: Maybe<Scalars['String']['output']>;
  /** カテゴリID fk m_category */
  m_category_id?: Maybe<Scalars['uuid']['output']>;
  /** 保管場所ID fk m_storage_lacation */
  m_storage_location_id?: Maybe<Scalars['uuid']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  publication_date?: Maybe<Scalars['timestamptz']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  /** タイトル */
  title?: Maybe<Scalars['String']['output']>;
  /** 更新日時 */
  update_date?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "libraflow.t_book" */
export type Libraflow_T_Book_Max_Order_By = {
  /** 著者情報 */
  author?: InputMaybe<Order_By>;
  /** 図書管理用コード */
  book_code?: InputMaybe<Order_By>;
  /** 登録日時 */
  create_date?: InputMaybe<Order_By>;
  /** 図書ID（主キー） */
  id?: InputMaybe<Order_By>;
  /** ISBNコード */
  isbn_code?: InputMaybe<Order_By>;
  /** カテゴリID fk m_category */
  m_category_id?: InputMaybe<Order_By>;
  /** 保管場所ID fk m_storage_lacation */
  m_storage_location_id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  publication_date?: InputMaybe<Order_By>;
  publisher?: InputMaybe<Order_By>;
  /** タイトル */
  title?: InputMaybe<Order_By>;
  /** 更新日時 */
  update_date?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Libraflow_T_Book_Min_Fields = {
  __typename?: 'libraflow_t_book_min_fields';
  /** 著者情報 */
  author?: Maybe<Scalars['String']['output']>;
  /** 図書管理用コード */
  book_code?: Maybe<Scalars['String']['output']>;
  /** 登録日時 */
  create_date?: Maybe<Scalars['timestamptz']['output']>;
  /** 図書ID（主キー） */
  id?: Maybe<Scalars['uuid']['output']>;
  /** ISBNコード */
  isbn_code?: Maybe<Scalars['String']['output']>;
  /** カテゴリID fk m_category */
  m_category_id?: Maybe<Scalars['uuid']['output']>;
  /** 保管場所ID fk m_storage_lacation */
  m_storage_location_id?: Maybe<Scalars['uuid']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  publication_date?: Maybe<Scalars['timestamptz']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  /** タイトル */
  title?: Maybe<Scalars['String']['output']>;
  /** 更新日時 */
  update_date?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "libraflow.t_book" */
export type Libraflow_T_Book_Min_Order_By = {
  /** 著者情報 */
  author?: InputMaybe<Order_By>;
  /** 図書管理用コード */
  book_code?: InputMaybe<Order_By>;
  /** 登録日時 */
  create_date?: InputMaybe<Order_By>;
  /** 図書ID（主キー） */
  id?: InputMaybe<Order_By>;
  /** ISBNコード */
  isbn_code?: InputMaybe<Order_By>;
  /** カテゴリID fk m_category */
  m_category_id?: InputMaybe<Order_By>;
  /** 保管場所ID fk m_storage_lacation */
  m_storage_location_id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  publication_date?: InputMaybe<Order_By>;
  publisher?: InputMaybe<Order_By>;
  /** タイトル */
  title?: InputMaybe<Order_By>;
  /** 更新日時 */
  update_date?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "libraflow.t_book" */
export type Libraflow_T_Book_Mutation_Response = {
  __typename?: 'libraflow_t_book_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Libraflow_T_Book>;
};

/** input type for inserting object relation for remote table "libraflow.t_book" */
export type Libraflow_T_Book_Obj_Rel_Insert_Input = {
  data: Libraflow_T_Book_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Libraflow_T_Book_On_Conflict>;
};

/** on conflict condition type for table "libraflow.t_book" */
export type Libraflow_T_Book_On_Conflict = {
  constraint: Libraflow_T_Book_Constraint;
  update_columns?: Array<Libraflow_T_Book_Update_Column>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};

/** Ordering options when selecting data from "libraflow.t_book". */
export type Libraflow_T_Book_Order_By = {
  _is_delete?: InputMaybe<Order_By>;
  author?: InputMaybe<Order_By>;
  book_code?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isbn_code?: InputMaybe<Order_By>;
  m_category?: InputMaybe<Libraflow_M_Category_Order_By>;
  m_category_id?: InputMaybe<Order_By>;
  m_storage_location?: InputMaybe<Libraflow_M_Storage_Location_Order_By>;
  m_storage_location_id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  publication_date?: InputMaybe<Order_By>;
  publisher?: InputMaybe<Order_By>;
  t_borrow_records_aggregate?: InputMaybe<Libraflow_T_Borrow_Record_Aggregate_Order_By>;
  t_reviews_aggregate?: InputMaybe<Libraflow_T_Review_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** primary key columns input for table: libraflow_t_book */
export type Libraflow_T_Book_Pk_Columns_Input = {
  /** 図書ID（主キー） */
  id: Scalars['uuid']['input'];
};

/** select columns of table "libraflow.t_book" */
export enum Libraflow_T_Book_Select_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  Author = 'author',
  /** column name */
  BookCode = 'book_code',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  IsbnCode = 'isbn_code',
  /** column name */
  MCategoryId = 'm_category_id',
  /** column name */
  MStorageLocationId = 'm_storage_location_id',
  /** column name */
  Note = 'note',
  /** column name */
  PublicationDate = 'publication_date',
  /** column name */
  Publisher = 'publisher',
  /** column name */
  Title = 'title',
  /** column name */
  UpdateDate = 'update_date'
}

/** input type for updating data in table "libraflow.t_book" */
export type Libraflow_T_Book_Set_Input = {
  /** 滅失フラグ */
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  /** 著者情報 */
  author?: InputMaybe<Scalars['String']['input']>;
  /** 図書管理用コード */
  book_code?: InputMaybe<Scalars['String']['input']>;
  /** 登録日時 */
  create_date?: InputMaybe<Scalars['timestamptz']['input']>;
  /** 図書ID（主キー） */
  id?: InputMaybe<Scalars['uuid']['input']>;
  /** ISBNコード */
  isbn_code?: InputMaybe<Scalars['String']['input']>;
  /** カテゴリID fk m_category */
  m_category_id?: InputMaybe<Scalars['uuid']['input']>;
  /** 保管場所ID fk m_storage_lacation */
  m_storage_location_id?: InputMaybe<Scalars['uuid']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  publication_date?: InputMaybe<Scalars['timestamptz']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  /** タイトル */
  title?: InputMaybe<Scalars['String']['input']>;
  /** 更新日時 */
  update_date?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "libraflow.t_book" */
export enum Libraflow_T_Book_Update_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  Author = 'author',
  /** column name */
  BookCode = 'book_code',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  IsbnCode = 'isbn_code',
  /** column name */
  MCategoryId = 'm_category_id',
  /** column name */
  MStorageLocationId = 'm_storage_location_id',
  /** column name */
  Note = 'note',
  /** column name */
  PublicationDate = 'publication_date',
  /** column name */
  Publisher = 'publisher',
  /** column name */
  Title = 'title',
  /** column name */
  UpdateDate = 'update_date'
}

/** columns and relationships of "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record = {
  __typename?: 'libraflow_t_borrow_record';
  _is_delete: Scalars['Boolean']['output'];
  borrow_date?: Maybe<Scalars['timestamptz']['output']>;
  create_date: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  m_user: Libraflow_M_User;
  m_user_id: Scalars['uuid']['output'];
  return_date?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  t_book: Libraflow_T_Book;
  t_book_id: Scalars['uuid']['output'];
  update_date: Scalars['timestamptz']['output'];
};

/** aggregated selection of "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Aggregate = {
  __typename?: 'libraflow_t_borrow_record_aggregate';
  aggregate?: Maybe<Libraflow_T_Borrow_Record_Aggregate_Fields>;
  nodes: Array<Libraflow_T_Borrow_Record>;
};

/** aggregate fields of "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Aggregate_Fields = {
  __typename?: 'libraflow_t_borrow_record_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Libraflow_T_Borrow_Record_Max_Fields>;
  min?: Maybe<Libraflow_T_Borrow_Record_Min_Fields>;
};


/** aggregate fields of "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Libraflow_T_Borrow_Record_Max_Order_By>;
  min?: InputMaybe<Libraflow_T_Borrow_Record_Min_Order_By>;
};

/** input type for inserting array relation for remote table "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Arr_Rel_Insert_Input = {
  data: Array<Libraflow_T_Borrow_Record_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Libraflow_T_Borrow_Record_On_Conflict>;
};

/** Boolean expression to filter rows from the table "libraflow.t_borrow_record". All fields are combined with a logical 'AND'. */
export type Libraflow_T_Borrow_Record_Bool_Exp = {
  _and?: InputMaybe<Array<Libraflow_T_Borrow_Record_Bool_Exp>>;
  _is_delete?: InputMaybe<Boolean_Comparison_Exp>;
  _not?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
  _or?: InputMaybe<Array<Libraflow_T_Borrow_Record_Bool_Exp>>;
  borrow_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  create_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  m_user?: InputMaybe<Libraflow_M_User_Bool_Exp>;
  m_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  return_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  t_book?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
  t_book_id?: InputMaybe<Uuid_Comparison_Exp>;
  update_date?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "libraflow.t_borrow_record" */
export enum Libraflow_T_Borrow_Record_Constraint {
  /** unique or primary key constraint */
  TBorrowRecordPkey = 't_borrow_record_pkey'
}

/** input type for inserting data into table "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Insert_Input = {
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  borrow_date?: InputMaybe<Scalars['timestamptz']['input']>;
  create_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  m_user?: InputMaybe<Libraflow_M_User_Obj_Rel_Insert_Input>;
  m_user_id?: InputMaybe<Scalars['uuid']['input']>;
  return_date?: InputMaybe<Scalars['timestamptz']['input']>;
  t_book?: InputMaybe<Libraflow_T_Book_Obj_Rel_Insert_Input>;
  t_book_id?: InputMaybe<Scalars['uuid']['input']>;
  update_date?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Libraflow_T_Borrow_Record_Max_Fields = {
  __typename?: 'libraflow_t_borrow_record_max_fields';
  borrow_date?: Maybe<Scalars['timestamptz']['output']>;
  create_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  m_user_id?: Maybe<Scalars['uuid']['output']>;
  return_date?: Maybe<Scalars['timestamptz']['output']>;
  t_book_id?: Maybe<Scalars['uuid']['output']>;
  update_date?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Max_Order_By = {
  borrow_date?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  m_user_id?: InputMaybe<Order_By>;
  return_date?: InputMaybe<Order_By>;
  t_book_id?: InputMaybe<Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Libraflow_T_Borrow_Record_Min_Fields = {
  __typename?: 'libraflow_t_borrow_record_min_fields';
  borrow_date?: Maybe<Scalars['timestamptz']['output']>;
  create_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  m_user_id?: Maybe<Scalars['uuid']['output']>;
  return_date?: Maybe<Scalars['timestamptz']['output']>;
  t_book_id?: Maybe<Scalars['uuid']['output']>;
  update_date?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Min_Order_By = {
  borrow_date?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  m_user_id?: InputMaybe<Order_By>;
  return_date?: InputMaybe<Order_By>;
  t_book_id?: InputMaybe<Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Mutation_Response = {
  __typename?: 'libraflow_t_borrow_record_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Libraflow_T_Borrow_Record>;
};

/** on conflict condition type for table "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_On_Conflict = {
  constraint: Libraflow_T_Borrow_Record_Constraint;
  update_columns?: Array<Libraflow_T_Borrow_Record_Update_Column>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};

/** Ordering options when selecting data from "libraflow.t_borrow_record". */
export type Libraflow_T_Borrow_Record_Order_By = {
  _is_delete?: InputMaybe<Order_By>;
  borrow_date?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  m_user?: InputMaybe<Libraflow_M_User_Order_By>;
  m_user_id?: InputMaybe<Order_By>;
  return_date?: InputMaybe<Order_By>;
  t_book?: InputMaybe<Libraflow_T_Book_Order_By>;
  t_book_id?: InputMaybe<Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** primary key columns input for table: libraflow_t_borrow_record */
export type Libraflow_T_Borrow_Record_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "libraflow.t_borrow_record" */
export enum Libraflow_T_Borrow_Record_Select_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  BorrowDate = 'borrow_date',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  MUserId = 'm_user_id',
  /** column name */
  ReturnDate = 'return_date',
  /** column name */
  TBookId = 't_book_id',
  /** column name */
  UpdateDate = 'update_date'
}

/** input type for updating data in table "libraflow.t_borrow_record" */
export type Libraflow_T_Borrow_Record_Set_Input = {
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  borrow_date?: InputMaybe<Scalars['timestamptz']['input']>;
  create_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  m_user_id?: InputMaybe<Scalars['uuid']['input']>;
  return_date?: InputMaybe<Scalars['timestamptz']['input']>;
  t_book_id?: InputMaybe<Scalars['uuid']['input']>;
  update_date?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "libraflow.t_borrow_record" */
export enum Libraflow_T_Borrow_Record_Update_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  BorrowDate = 'borrow_date',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  MUserId = 'm_user_id',
  /** column name */
  ReturnDate = 'return_date',
  /** column name */
  TBookId = 't_book_id',
  /** column name */
  UpdateDate = 'update_date'
}

/** columns and relationships of "libraflow.t_review" */
export type Libraflow_T_Review = {
  __typename?: 'libraflow_t_review';
  _is_delete: Scalars['Boolean']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  create_date: Scalars['timetz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  m_user: Libraflow_M_User;
  m_user_id: Scalars['uuid']['output'];
  ratency: Scalars['Int']['output'];
  /** An object relationship */
  t_book: Libraflow_T_Book;
  t_book_id: Scalars['uuid']['output'];
  update_date: Scalars['timetz']['output'];
};

/** aggregated selection of "libraflow.t_review" */
export type Libraflow_T_Review_Aggregate = {
  __typename?: 'libraflow_t_review_aggregate';
  aggregate?: Maybe<Libraflow_T_Review_Aggregate_Fields>;
  nodes: Array<Libraflow_T_Review>;
};

/** aggregate fields of "libraflow.t_review" */
export type Libraflow_T_Review_Aggregate_Fields = {
  __typename?: 'libraflow_t_review_aggregate_fields';
  avg?: Maybe<Libraflow_T_Review_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Libraflow_T_Review_Max_Fields>;
  min?: Maybe<Libraflow_T_Review_Min_Fields>;
  stddev?: Maybe<Libraflow_T_Review_Stddev_Fields>;
  stddev_pop?: Maybe<Libraflow_T_Review_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Libraflow_T_Review_Stddev_Samp_Fields>;
  sum?: Maybe<Libraflow_T_Review_Sum_Fields>;
  var_pop?: Maybe<Libraflow_T_Review_Var_Pop_Fields>;
  var_samp?: Maybe<Libraflow_T_Review_Var_Samp_Fields>;
  variance?: Maybe<Libraflow_T_Review_Variance_Fields>;
};


/** aggregate fields of "libraflow.t_review" */
export type Libraflow_T_Review_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "libraflow.t_review" */
export type Libraflow_T_Review_Aggregate_Order_By = {
  avg?: InputMaybe<Libraflow_T_Review_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Libraflow_T_Review_Max_Order_By>;
  min?: InputMaybe<Libraflow_T_Review_Min_Order_By>;
  stddev?: InputMaybe<Libraflow_T_Review_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Libraflow_T_Review_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Libraflow_T_Review_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Libraflow_T_Review_Sum_Order_By>;
  var_pop?: InputMaybe<Libraflow_T_Review_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Libraflow_T_Review_Var_Samp_Order_By>;
  variance?: InputMaybe<Libraflow_T_Review_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "libraflow.t_review" */
export type Libraflow_T_Review_Arr_Rel_Insert_Input = {
  data: Array<Libraflow_T_Review_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Libraflow_T_Review_On_Conflict>;
};

/** aggregate avg on columns */
export type Libraflow_T_Review_Avg_Fields = {
  __typename?: 'libraflow_t_review_avg_fields';
  ratency?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Avg_Order_By = {
  ratency?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "libraflow.t_review". All fields are combined with a logical 'AND'. */
export type Libraflow_T_Review_Bool_Exp = {
  _and?: InputMaybe<Array<Libraflow_T_Review_Bool_Exp>>;
  _is_delete?: InputMaybe<Boolean_Comparison_Exp>;
  _not?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
  _or?: InputMaybe<Array<Libraflow_T_Review_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  create_date?: InputMaybe<Timetz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  m_user?: InputMaybe<Libraflow_M_User_Bool_Exp>;
  m_user_id?: InputMaybe<Uuid_Comparison_Exp>;
  ratency?: InputMaybe<Int_Comparison_Exp>;
  t_book?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
  t_book_id?: InputMaybe<Uuid_Comparison_Exp>;
  update_date?: InputMaybe<Timetz_Comparison_Exp>;
};

/** unique or primary key constraints on table "libraflow.t_review" */
export enum Libraflow_T_Review_Constraint {
  /** unique or primary key constraint */
  TReviewPk = 't_review_pk'
}

/** input type for incrementing numeric columns in table "libraflow.t_review" */
export type Libraflow_T_Review_Inc_Input = {
  ratency?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "libraflow.t_review" */
export type Libraflow_T_Review_Insert_Input = {
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  create_date?: InputMaybe<Scalars['timetz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  m_user?: InputMaybe<Libraflow_M_User_Obj_Rel_Insert_Input>;
  m_user_id?: InputMaybe<Scalars['uuid']['input']>;
  ratency?: InputMaybe<Scalars['Int']['input']>;
  t_book?: InputMaybe<Libraflow_T_Book_Obj_Rel_Insert_Input>;
  t_book_id?: InputMaybe<Scalars['uuid']['input']>;
  update_date?: InputMaybe<Scalars['timetz']['input']>;
};

/** aggregate max on columns */
export type Libraflow_T_Review_Max_Fields = {
  __typename?: 'libraflow_t_review_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  create_date?: Maybe<Scalars['timetz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  m_user_id?: Maybe<Scalars['uuid']['output']>;
  ratency?: Maybe<Scalars['Int']['output']>;
  t_book_id?: Maybe<Scalars['uuid']['output']>;
  update_date?: Maybe<Scalars['timetz']['output']>;
};

/** order by max() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Max_Order_By = {
  comment?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  m_user_id?: InputMaybe<Order_By>;
  ratency?: InputMaybe<Order_By>;
  t_book_id?: InputMaybe<Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Libraflow_T_Review_Min_Fields = {
  __typename?: 'libraflow_t_review_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  create_date?: Maybe<Scalars['timetz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  m_user_id?: Maybe<Scalars['uuid']['output']>;
  ratency?: Maybe<Scalars['Int']['output']>;
  t_book_id?: Maybe<Scalars['uuid']['output']>;
  update_date?: Maybe<Scalars['timetz']['output']>;
};

/** order by min() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Min_Order_By = {
  comment?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  m_user_id?: InputMaybe<Order_By>;
  ratency?: InputMaybe<Order_By>;
  t_book_id?: InputMaybe<Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "libraflow.t_review" */
export type Libraflow_T_Review_Mutation_Response = {
  __typename?: 'libraflow_t_review_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Libraflow_T_Review>;
};

/** on conflict condition type for table "libraflow.t_review" */
export type Libraflow_T_Review_On_Conflict = {
  constraint: Libraflow_T_Review_Constraint;
  update_columns?: Array<Libraflow_T_Review_Update_Column>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};

/** Ordering options when selecting data from "libraflow.t_review". */
export type Libraflow_T_Review_Order_By = {
  _is_delete?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  create_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  m_user?: InputMaybe<Libraflow_M_User_Order_By>;
  m_user_id?: InputMaybe<Order_By>;
  ratency?: InputMaybe<Order_By>;
  t_book?: InputMaybe<Libraflow_T_Book_Order_By>;
  t_book_id?: InputMaybe<Order_By>;
  update_date?: InputMaybe<Order_By>;
};

/** primary key columns input for table: libraflow_t_review */
export type Libraflow_T_Review_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "libraflow.t_review" */
export enum Libraflow_T_Review_Select_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  Comment = 'comment',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  MUserId = 'm_user_id',
  /** column name */
  Ratency = 'ratency',
  /** column name */
  TBookId = 't_book_id',
  /** column name */
  UpdateDate = 'update_date'
}

/** input type for updating data in table "libraflow.t_review" */
export type Libraflow_T_Review_Set_Input = {
  _is_delete?: InputMaybe<Scalars['Boolean']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  create_date?: InputMaybe<Scalars['timetz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  m_user_id?: InputMaybe<Scalars['uuid']['input']>;
  ratency?: InputMaybe<Scalars['Int']['input']>;
  t_book_id?: InputMaybe<Scalars['uuid']['input']>;
  update_date?: InputMaybe<Scalars['timetz']['input']>;
};

/** aggregate stddev on columns */
export type Libraflow_T_Review_Stddev_Fields = {
  __typename?: 'libraflow_t_review_stddev_fields';
  ratency?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Stddev_Order_By = {
  ratency?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Libraflow_T_Review_Stddev_Pop_Fields = {
  __typename?: 'libraflow_t_review_stddev_pop_fields';
  ratency?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Stddev_Pop_Order_By = {
  ratency?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Libraflow_T_Review_Stddev_Samp_Fields = {
  __typename?: 'libraflow_t_review_stddev_samp_fields';
  ratency?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Stddev_Samp_Order_By = {
  ratency?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Libraflow_T_Review_Sum_Fields = {
  __typename?: 'libraflow_t_review_sum_fields';
  ratency?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Sum_Order_By = {
  ratency?: InputMaybe<Order_By>;
};

/** update columns of table "libraflow.t_review" */
export enum Libraflow_T_Review_Update_Column {
  /** column name */
  IsDelete = '_is_delete',
  /** column name */
  Comment = 'comment',
  /** column name */
  CreateDate = 'create_date',
  /** column name */
  Id = 'id',
  /** column name */
  MUserId = 'm_user_id',
  /** column name */
  Ratency = 'ratency',
  /** column name */
  TBookId = 't_book_id',
  /** column name */
  UpdateDate = 'update_date'
}

/** aggregate var_pop on columns */
export type Libraflow_T_Review_Var_Pop_Fields = {
  __typename?: 'libraflow_t_review_var_pop_fields';
  ratency?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Var_Pop_Order_By = {
  ratency?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Libraflow_T_Review_Var_Samp_Fields = {
  __typename?: 'libraflow_t_review_var_samp_fields';
  ratency?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Var_Samp_Order_By = {
  ratency?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Libraflow_T_Review_Variance_Fields = {
  __typename?: 'libraflow_t_review_variance_fields';
  ratency?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "libraflow.t_review" */
export type Libraflow_T_Review_Variance_Order_By = {
  ratency?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "libraflow.m_category" */
  delete_libraflow_m_category?: Maybe<Libraflow_M_Category_Mutation_Response>;
  /** delete single row from the table: "libraflow.m_category" */
  delete_libraflow_m_category_by_pk?: Maybe<Libraflow_M_Category>;
  /** delete data from the table: "libraflow.m_storage_location" */
  delete_libraflow_m_storage_location?: Maybe<Libraflow_M_Storage_Location_Mutation_Response>;
  /** delete single row from the table: "libraflow.m_storage_location" */
  delete_libraflow_m_storage_location_by_pk?: Maybe<Libraflow_M_Storage_Location>;
  /** delete data from the table: "libraflow.m_user" */
  delete_libraflow_m_user?: Maybe<Libraflow_M_User_Mutation_Response>;
  /** delete single row from the table: "libraflow.m_user" */
  delete_libraflow_m_user_by_pk?: Maybe<Libraflow_M_User>;
  /** delete data from the table: "libraflow.t_book" */
  delete_libraflow_t_book?: Maybe<Libraflow_T_Book_Mutation_Response>;
  /** delete single row from the table: "libraflow.t_book" */
  delete_libraflow_t_book_by_pk?: Maybe<Libraflow_T_Book>;
  /** delete data from the table: "libraflow.t_borrow_record" */
  delete_libraflow_t_borrow_record?: Maybe<Libraflow_T_Borrow_Record_Mutation_Response>;
  /** delete single row from the table: "libraflow.t_borrow_record" */
  delete_libraflow_t_borrow_record_by_pk?: Maybe<Libraflow_T_Borrow_Record>;
  /** delete data from the table: "libraflow.t_review" */
  delete_libraflow_t_review?: Maybe<Libraflow_T_Review_Mutation_Response>;
  /** delete single row from the table: "libraflow.t_review" */
  delete_libraflow_t_review_by_pk?: Maybe<Libraflow_T_Review>;
  /** insert data into the table: "libraflow.m_category" */
  insert_libraflow_m_category?: Maybe<Libraflow_M_Category_Mutation_Response>;
  /** insert a single row into the table: "libraflow.m_category" */
  insert_libraflow_m_category_one?: Maybe<Libraflow_M_Category>;
  /** insert data into the table: "libraflow.m_storage_location" */
  insert_libraflow_m_storage_location?: Maybe<Libraflow_M_Storage_Location_Mutation_Response>;
  /** insert a single row into the table: "libraflow.m_storage_location" */
  insert_libraflow_m_storage_location_one?: Maybe<Libraflow_M_Storage_Location>;
  /** insert data into the table: "libraflow.m_user" */
  insert_libraflow_m_user?: Maybe<Libraflow_M_User_Mutation_Response>;
  /** insert a single row into the table: "libraflow.m_user" */
  insert_libraflow_m_user_one?: Maybe<Libraflow_M_User>;
  /** insert data into the table: "libraflow.t_book" */
  insert_libraflow_t_book?: Maybe<Libraflow_T_Book_Mutation_Response>;
  /** insert a single row into the table: "libraflow.t_book" */
  insert_libraflow_t_book_one?: Maybe<Libraflow_T_Book>;
  /** insert data into the table: "libraflow.t_borrow_record" */
  insert_libraflow_t_borrow_record?: Maybe<Libraflow_T_Borrow_Record_Mutation_Response>;
  /** insert a single row into the table: "libraflow.t_borrow_record" */
  insert_libraflow_t_borrow_record_one?: Maybe<Libraflow_T_Borrow_Record>;
  /** insert data into the table: "libraflow.t_review" */
  insert_libraflow_t_review?: Maybe<Libraflow_T_Review_Mutation_Response>;
  /** insert a single row into the table: "libraflow.t_review" */
  insert_libraflow_t_review_one?: Maybe<Libraflow_T_Review>;
  /** update data of the table: "libraflow.m_category" */
  update_libraflow_m_category?: Maybe<Libraflow_M_Category_Mutation_Response>;
  /** update single row of the table: "libraflow.m_category" */
  update_libraflow_m_category_by_pk?: Maybe<Libraflow_M_Category>;
  /** update data of the table: "libraflow.m_storage_location" */
  update_libraflow_m_storage_location?: Maybe<Libraflow_M_Storage_Location_Mutation_Response>;
  /** update single row of the table: "libraflow.m_storage_location" */
  update_libraflow_m_storage_location_by_pk?: Maybe<Libraflow_M_Storage_Location>;
  /** update data of the table: "libraflow.m_user" */
  update_libraflow_m_user?: Maybe<Libraflow_M_User_Mutation_Response>;
  /** update single row of the table: "libraflow.m_user" */
  update_libraflow_m_user_by_pk?: Maybe<Libraflow_M_User>;
  /** update data of the table: "libraflow.t_book" */
  update_libraflow_t_book?: Maybe<Libraflow_T_Book_Mutation_Response>;
  /** update single row of the table: "libraflow.t_book" */
  update_libraflow_t_book_by_pk?: Maybe<Libraflow_T_Book>;
  /** update data of the table: "libraflow.t_borrow_record" */
  update_libraflow_t_borrow_record?: Maybe<Libraflow_T_Borrow_Record_Mutation_Response>;
  /** update single row of the table: "libraflow.t_borrow_record" */
  update_libraflow_t_borrow_record_by_pk?: Maybe<Libraflow_T_Borrow_Record>;
  /** update data of the table: "libraflow.t_review" */
  update_libraflow_t_review?: Maybe<Libraflow_T_Review_Mutation_Response>;
  /** update single row of the table: "libraflow.t_review" */
  update_libraflow_t_review_by_pk?: Maybe<Libraflow_T_Review>;
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_M_CategoryArgs = {
  where: Libraflow_M_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_M_Category_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_M_Storage_LocationArgs = {
  where: Libraflow_M_Storage_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_M_Storage_Location_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_M_UserArgs = {
  where: Libraflow_M_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_M_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_T_BookArgs = {
  where: Libraflow_T_Book_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_T_Book_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_T_Borrow_RecordArgs = {
  where: Libraflow_T_Borrow_Record_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_T_Borrow_Record_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_T_ReviewArgs = {
  where: Libraflow_T_Review_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Libraflow_T_Review_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_M_CategoryArgs = {
  objects: Array<Libraflow_M_Category_Insert_Input>;
  on_conflict?: InputMaybe<Libraflow_M_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_M_Category_OneArgs = {
  object: Libraflow_M_Category_Insert_Input;
  on_conflict?: InputMaybe<Libraflow_M_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_M_Storage_LocationArgs = {
  objects: Array<Libraflow_M_Storage_Location_Insert_Input>;
  on_conflict?: InputMaybe<Libraflow_M_Storage_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_M_Storage_Location_OneArgs = {
  object: Libraflow_M_Storage_Location_Insert_Input;
  on_conflict?: InputMaybe<Libraflow_M_Storage_Location_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_M_UserArgs = {
  objects: Array<Libraflow_M_User_Insert_Input>;
  on_conflict?: InputMaybe<Libraflow_M_User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_M_User_OneArgs = {
  object: Libraflow_M_User_Insert_Input;
  on_conflict?: InputMaybe<Libraflow_M_User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_T_BookArgs = {
  objects: Array<Libraflow_T_Book_Insert_Input>;
  on_conflict?: InputMaybe<Libraflow_T_Book_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_T_Book_OneArgs = {
  object: Libraflow_T_Book_Insert_Input;
  on_conflict?: InputMaybe<Libraflow_T_Book_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_T_Borrow_RecordArgs = {
  objects: Array<Libraflow_T_Borrow_Record_Insert_Input>;
  on_conflict?: InputMaybe<Libraflow_T_Borrow_Record_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_T_Borrow_Record_OneArgs = {
  object: Libraflow_T_Borrow_Record_Insert_Input;
  on_conflict?: InputMaybe<Libraflow_T_Borrow_Record_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_T_ReviewArgs = {
  objects: Array<Libraflow_T_Review_Insert_Input>;
  on_conflict?: InputMaybe<Libraflow_T_Review_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Libraflow_T_Review_OneArgs = {
  object: Libraflow_T_Review_Insert_Input;
  on_conflict?: InputMaybe<Libraflow_T_Review_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_M_CategoryArgs = {
  _set?: InputMaybe<Libraflow_M_Category_Set_Input>;
  where: Libraflow_M_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_M_Category_By_PkArgs = {
  _set?: InputMaybe<Libraflow_M_Category_Set_Input>;
  pk_columns: Libraflow_M_Category_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_M_Storage_LocationArgs = {
  _inc?: InputMaybe<Libraflow_M_Storage_Location_Inc_Input>;
  _set?: InputMaybe<Libraflow_M_Storage_Location_Set_Input>;
  where: Libraflow_M_Storage_Location_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_M_Storage_Location_By_PkArgs = {
  _inc?: InputMaybe<Libraflow_M_Storage_Location_Inc_Input>;
  _set?: InputMaybe<Libraflow_M_Storage_Location_Set_Input>;
  pk_columns: Libraflow_M_Storage_Location_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_M_UserArgs = {
  _set?: InputMaybe<Libraflow_M_User_Set_Input>;
  where: Libraflow_M_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_M_User_By_PkArgs = {
  _set?: InputMaybe<Libraflow_M_User_Set_Input>;
  pk_columns: Libraflow_M_User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_T_BookArgs = {
  _set?: InputMaybe<Libraflow_T_Book_Set_Input>;
  where: Libraflow_T_Book_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_T_Book_By_PkArgs = {
  _set?: InputMaybe<Libraflow_T_Book_Set_Input>;
  pk_columns: Libraflow_T_Book_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_T_Borrow_RecordArgs = {
  _set?: InputMaybe<Libraflow_T_Borrow_Record_Set_Input>;
  where: Libraflow_T_Borrow_Record_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_T_Borrow_Record_By_PkArgs = {
  _set?: InputMaybe<Libraflow_T_Borrow_Record_Set_Input>;
  pk_columns: Libraflow_T_Borrow_Record_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_T_ReviewArgs = {
  _inc?: InputMaybe<Libraflow_T_Review_Inc_Input>;
  _set?: InputMaybe<Libraflow_T_Review_Set_Input>;
  where: Libraflow_T_Review_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Libraflow_T_Review_By_PkArgs = {
  _inc?: InputMaybe<Libraflow_T_Review_Inc_Input>;
  _set?: InputMaybe<Libraflow_T_Review_Set_Input>;
  pk_columns: Libraflow_T_Review_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "libraflow.m_category" */
  libraflow_m_category: Array<Libraflow_M_Category>;
  /** fetch aggregated fields from the table: "libraflow.m_category" */
  libraflow_m_category_aggregate: Libraflow_M_Category_Aggregate;
  /** fetch data from the table: "libraflow.m_category" using primary key columns */
  libraflow_m_category_by_pk?: Maybe<Libraflow_M_Category>;
  /** fetch data from the table: "libraflow.m_storage_location" */
  libraflow_m_storage_location: Array<Libraflow_M_Storage_Location>;
  /** fetch aggregated fields from the table: "libraflow.m_storage_location" */
  libraflow_m_storage_location_aggregate: Libraflow_M_Storage_Location_Aggregate;
  /** fetch data from the table: "libraflow.m_storage_location" using primary key columns */
  libraflow_m_storage_location_by_pk?: Maybe<Libraflow_M_Storage_Location>;
  /** fetch data from the table: "libraflow.m_user" */
  libraflow_m_user: Array<Libraflow_M_User>;
  /** fetch aggregated fields from the table: "libraflow.m_user" */
  libraflow_m_user_aggregate: Libraflow_M_User_Aggregate;
  /** fetch data from the table: "libraflow.m_user" using primary key columns */
  libraflow_m_user_by_pk?: Maybe<Libraflow_M_User>;
  /** fetch data from the table: "libraflow.t_book" */
  libraflow_t_book: Array<Libraflow_T_Book>;
  /** fetch aggregated fields from the table: "libraflow.t_book" */
  libraflow_t_book_aggregate: Libraflow_T_Book_Aggregate;
  /** fetch data from the table: "libraflow.t_book" using primary key columns */
  libraflow_t_book_by_pk?: Maybe<Libraflow_T_Book>;
  /** fetch data from the table: "libraflow.t_borrow_record" */
  libraflow_t_borrow_record: Array<Libraflow_T_Borrow_Record>;
  /** fetch aggregated fields from the table: "libraflow.t_borrow_record" */
  libraflow_t_borrow_record_aggregate: Libraflow_T_Borrow_Record_Aggregate;
  /** fetch data from the table: "libraflow.t_borrow_record" using primary key columns */
  libraflow_t_borrow_record_by_pk?: Maybe<Libraflow_T_Borrow_Record>;
  /** fetch data from the table: "libraflow.t_review" */
  libraflow_t_review: Array<Libraflow_T_Review>;
  /** fetch aggregated fields from the table: "libraflow.t_review" */
  libraflow_t_review_aggregate: Libraflow_T_Review_Aggregate;
  /** fetch data from the table: "libraflow.t_review" using primary key columns */
  libraflow_t_review_by_pk?: Maybe<Libraflow_T_Review>;
};


export type Query_RootLibraflow_M_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_Category_Order_By>>;
  where?: InputMaybe<Libraflow_M_Category_Bool_Exp>;
};


export type Query_RootLibraflow_M_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_Category_Order_By>>;
  where?: InputMaybe<Libraflow_M_Category_Bool_Exp>;
};


export type Query_RootLibraflow_M_Category_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLibraflow_M_Storage_LocationArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_Storage_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_Storage_Location_Order_By>>;
  where?: InputMaybe<Libraflow_M_Storage_Location_Bool_Exp>;
};


export type Query_RootLibraflow_M_Storage_Location_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_Storage_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_Storage_Location_Order_By>>;
  where?: InputMaybe<Libraflow_M_Storage_Location_Bool_Exp>;
};


export type Query_RootLibraflow_M_Storage_Location_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLibraflow_M_UserArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_User_Order_By>>;
  where?: InputMaybe<Libraflow_M_User_Bool_Exp>;
};


export type Query_RootLibraflow_M_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_User_Order_By>>;
  where?: InputMaybe<Libraflow_M_User_Bool_Exp>;
};


export type Query_RootLibraflow_M_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLibraflow_T_BookArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Book_Order_By>>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};


export type Query_RootLibraflow_T_Book_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Book_Order_By>>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};


export type Query_RootLibraflow_T_Book_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLibraflow_T_Borrow_RecordArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Borrow_Record_Order_By>>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};


export type Query_RootLibraflow_T_Borrow_Record_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Borrow_Record_Order_By>>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};


export type Query_RootLibraflow_T_Borrow_Record_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLibraflow_T_ReviewArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Review_Order_By>>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};


export type Query_RootLibraflow_T_Review_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Review_Order_By>>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};


export type Query_RootLibraflow_T_Review_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "libraflow.m_category" */
  libraflow_m_category: Array<Libraflow_M_Category>;
  /** fetch aggregated fields from the table: "libraflow.m_category" */
  libraflow_m_category_aggregate: Libraflow_M_Category_Aggregate;
  /** fetch data from the table: "libraflow.m_category" using primary key columns */
  libraflow_m_category_by_pk?: Maybe<Libraflow_M_Category>;
  /** fetch data from the table: "libraflow.m_storage_location" */
  libraflow_m_storage_location: Array<Libraflow_M_Storage_Location>;
  /** fetch aggregated fields from the table: "libraflow.m_storage_location" */
  libraflow_m_storage_location_aggregate: Libraflow_M_Storage_Location_Aggregate;
  /** fetch data from the table: "libraflow.m_storage_location" using primary key columns */
  libraflow_m_storage_location_by_pk?: Maybe<Libraflow_M_Storage_Location>;
  /** fetch data from the table: "libraflow.m_user" */
  libraflow_m_user: Array<Libraflow_M_User>;
  /** fetch aggregated fields from the table: "libraflow.m_user" */
  libraflow_m_user_aggregate: Libraflow_M_User_Aggregate;
  /** fetch data from the table: "libraflow.m_user" using primary key columns */
  libraflow_m_user_by_pk?: Maybe<Libraflow_M_User>;
  /** fetch data from the table: "libraflow.t_book" */
  libraflow_t_book: Array<Libraflow_T_Book>;
  /** fetch aggregated fields from the table: "libraflow.t_book" */
  libraflow_t_book_aggregate: Libraflow_T_Book_Aggregate;
  /** fetch data from the table: "libraflow.t_book" using primary key columns */
  libraflow_t_book_by_pk?: Maybe<Libraflow_T_Book>;
  /** fetch data from the table: "libraflow.t_borrow_record" */
  libraflow_t_borrow_record: Array<Libraflow_T_Borrow_Record>;
  /** fetch aggregated fields from the table: "libraflow.t_borrow_record" */
  libraflow_t_borrow_record_aggregate: Libraflow_T_Borrow_Record_Aggregate;
  /** fetch data from the table: "libraflow.t_borrow_record" using primary key columns */
  libraflow_t_borrow_record_by_pk?: Maybe<Libraflow_T_Borrow_Record>;
  /** fetch data from the table: "libraflow.t_review" */
  libraflow_t_review: Array<Libraflow_T_Review>;
  /** fetch aggregated fields from the table: "libraflow.t_review" */
  libraflow_t_review_aggregate: Libraflow_T_Review_Aggregate;
  /** fetch data from the table: "libraflow.t_review" using primary key columns */
  libraflow_t_review_by_pk?: Maybe<Libraflow_T_Review>;
};


export type Subscription_RootLibraflow_M_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_Category_Order_By>>;
  where?: InputMaybe<Libraflow_M_Category_Bool_Exp>;
};


export type Subscription_RootLibraflow_M_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_Category_Order_By>>;
  where?: InputMaybe<Libraflow_M_Category_Bool_Exp>;
};


export type Subscription_RootLibraflow_M_Category_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootLibraflow_M_Storage_LocationArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_Storage_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_Storage_Location_Order_By>>;
  where?: InputMaybe<Libraflow_M_Storage_Location_Bool_Exp>;
};


export type Subscription_RootLibraflow_M_Storage_Location_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_Storage_Location_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_Storage_Location_Order_By>>;
  where?: InputMaybe<Libraflow_M_Storage_Location_Bool_Exp>;
};


export type Subscription_RootLibraflow_M_Storage_Location_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootLibraflow_M_UserArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_User_Order_By>>;
  where?: InputMaybe<Libraflow_M_User_Bool_Exp>;
};


export type Subscription_RootLibraflow_M_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_M_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_M_User_Order_By>>;
  where?: InputMaybe<Libraflow_M_User_Bool_Exp>;
};


export type Subscription_RootLibraflow_M_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootLibraflow_T_BookArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Book_Order_By>>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};


export type Subscription_RootLibraflow_T_Book_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Book_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Book_Order_By>>;
  where?: InputMaybe<Libraflow_T_Book_Bool_Exp>;
};


export type Subscription_RootLibraflow_T_Book_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootLibraflow_T_Borrow_RecordArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Borrow_Record_Order_By>>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};


export type Subscription_RootLibraflow_T_Borrow_Record_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Borrow_Record_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Borrow_Record_Order_By>>;
  where?: InputMaybe<Libraflow_T_Borrow_Record_Bool_Exp>;
};


export type Subscription_RootLibraflow_T_Borrow_Record_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootLibraflow_T_ReviewArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Review_Order_By>>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};


export type Subscription_RootLibraflow_T_Review_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Libraflow_T_Review_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Libraflow_T_Review_Order_By>>;
  where?: InputMaybe<Libraflow_T_Review_Bool_Exp>;
};


export type Subscription_RootLibraflow_T_Review_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** Boolean expression to compare columns of type "timetz". All fields are combined with logical 'AND'. */
export type Timetz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timetz']['input']>;
  _gt?: InputMaybe<Scalars['timetz']['input']>;
  _gte?: InputMaybe<Scalars['timetz']['input']>;
  _in?: InputMaybe<Array<Scalars['timetz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timetz']['input']>;
  _lte?: InputMaybe<Scalars['timetz']['input']>;
  _neq?: InputMaybe<Scalars['timetz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timetz']['input']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type GetBookByCodeQueryVariables = Exact<{
  book_code: Scalars['String']['input'];
}>;


export type GetBookByCodeQuery = { __typename?: 'query_root', libraflow_t_book: Array<{ __typename?: 'libraflow_t_book', id: any, book_code: string, title: string, author?: string | null, isbn_code?: string | null, m_category_id?: any | null, m_storage_location_id?: any | null, note?: string | null, publisher?: string | null, publication_date?: any | null }>, libraflow_m_storage_location: Array<{ __typename?: 'libraflow_m_storage_location', id: any, storage_location_name: string, index?: number | null }>, libraflow_m_category: Array<{ __typename?: 'libraflow_m_category', id: any, category_name: string }> };

export type UpdateBookMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  author?: InputMaybe<Scalars['String']['input']>;
  isbn_code?: InputMaybe<Scalars['String']['input']>;
  m_category_id?: InputMaybe<Scalars['uuid']['input']>;
  m_storage_location_id?: InputMaybe<Scalars['uuid']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  publication_date?: InputMaybe<Scalars['timestamptz']['input']>;
}>;


export type UpdateBookMutation = { __typename?: 'mutation_root', update_libraflow_t_book_by_pk?: { __typename?: 'libraflow_t_book', id: any } | null };

export type MyQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyQueryQuery = { __typename?: 'query_root', libraflow_t_book: Array<{ __typename?: 'libraflow_t_book', id: any, book_code: string, title: string, author?: string | null, isbn_code?: string | null, m_category_id?: any | null, m_storage_location_id?: any | null, update_date: any, create_date: any, _is_delete: boolean, note?: string | null, publisher?: string | null, publication_date?: any | null }> };


export const GetBookByCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookByCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"book_code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraflow_t_book"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"book_code"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"book_code"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"book_code"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"isbn_code"}},{"kind":"Field","name":{"kind":"Name","value":"m_category_id"}},{"kind":"Field","name":{"kind":"Name","value":"m_storage_location_id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"publication_date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"libraflow_m_storage_location"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"index"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"storage_location_name"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"Field","name":{"kind":"Name","value":"libraflow_m_category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category_name"}}]}}]}}]} as unknown as DocumentNode<GetBookByCodeQuery, GetBookByCodeQueryVariables>;
export const UpdateBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"author"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isbn_code"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"m_category_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"m_storage_location_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"note"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publisher"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publication_date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_libraflow_t_book_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"author"},"value":{"kind":"Variable","name":{"kind":"Name","value":"author"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isbn_code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isbn_code"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"m_category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"m_category_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"m_storage_location_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"m_storage_location_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"note"},"value":{"kind":"Variable","name":{"kind":"Name","value":"note"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"publisher"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publisher"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"publication_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publication_date"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateBookMutation, UpdateBookMutationVariables>;
export const MyQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraflow_t_book"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"book_code"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"isbn_code"}},{"kind":"Field","name":{"kind":"Name","value":"m_category_id"}},{"kind":"Field","name":{"kind":"Name","value":"m_storage_location_id"}},{"kind":"Field","name":{"kind":"Name","value":"update_date"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"_is_delete"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"publication_date"}}]}}]}}]} as unknown as DocumentNode<MyQueryQuery, MyQueryQueryVariables>;