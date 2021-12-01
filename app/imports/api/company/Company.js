import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The CompanyCollection. It encapsulates state and variable values for stuff.
 */
class CompanyCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CompanyCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: { type: String, index: true, unique: true },
      phone: { type: String, optional: true },
      description: { type: String, optional: true },
      image: { type: String, optional: true },
      email: { type: String, optional: true },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the CompanyCollection.
 * @type {CompanyCollection}
 */
export const Company = new CompanyCollection();
