const mongoose = require("mongoose");
const mongoConfig = require("../config/DBconfig/DBConfig");
const ErrorCustom = require("../errorCustom");

mongoose.connect(mongoConfig.URL, mongoConfig.options);
let instancia = null;
module.exports = class BasicDAO {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }
  static getInstance(collectionName, schema) {
    if (!instancia) instancia = new BasicDAO(collectionName, schema);
    return instancia;
  }

  async save(item) {
    try {
      item.timestamp = new Date();
      const newItem = await this.collection.create(item);
      if (newItem) {
        return newItem;
      }
      const err = new ErrorCustom(error, 500, "Error");
      throw err;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const allData = await this.collection.find({});

      return allData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteById(id) {
    try {
      const deletedItem = await this.collection.deleteOne({ _id: id });
      if (deletedItem?.deletedCount) {
        return `Se eliminó el producto`;
      }
      const err = new ErrorCustom(`Item no encontrado ${id}`, 404, "Not found");
      throw err;
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }
  async update(item) {
    try {
      const updatedItem = await this.collection.findOneAndUpdate(
        { _id: item._id },
        item,
        { new: true }
      );
      if (updatedItem) return updatedItem;

      const err = new ErrorCustom(
        `Producto no encontrado ${item.id}`,
        404,
        "Not found"
      );
      throw err;
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  }
};
