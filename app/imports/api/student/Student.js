import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StudentCollection. It encapsulates state and variable values for stuff.
 */
class StudentCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StudentCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      address: String,
      phone: String,
      description: String,
      image: String,
      owner: String,
      interest: {
        type: String,
        allowedValues: ['css', 'design', 'html', 'ia', 'javascript', 'meteor', 'node', 'python', 'react', 'ruby', 'ui'],
        defaultValue: 'css',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.studentPublicationName = `${this.name}.publication.student`;
    this.recruiterPublicationName = `${this.name}.publication.recruiter`;
  }
}

/**
 * The singleton instance of the StudentCollection.
 * @type {StudentCollection}
 */
export const Student = new StudentCollection();
