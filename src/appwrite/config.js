import conf from "../conf/conf.js";
import { Client, ID, Database, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.bucket = new Storage(this.client);
    this.database = new Database(this.client);
  }

  // createPost method

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  // update method

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  // delete method

  async deletePost(slug) {
    try {
      await this.database.deletePost(
        conf.appWriteCollectionId,
        conf.appWriteDatabaseId,
        slug
      );

      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost error", error);
      return false;
    }
  }

  // getting single blogPost

  async gtePost(slug) {
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }

  // get Posts

  async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.database.listDocuments(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("Appwrite service :: getPosts :: error", error);
        return false
    }
  }

  // file upload service

  async fileUpload(file) {
    try {
        return await this.bucket.createle(
            conf.appWriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log(console.log("Appwrite service :: fileUpload :: error", error););
    }
  }

  // delete file service
  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appWriteBucketId,
            fileId
        )

        return true
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error);
    }
  }

  // get file preview

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
        conf.appWriteBucketId,
        fileId
    )
  }

}

const service = new Service();
export default service;
