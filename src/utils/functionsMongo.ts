import { functionsMongoType } from '../types/mongo';

const functionsMongo: functionsMongoType = {};

functionsMongo.insert = (collection: any, object: object) => {
  return new Promise((resolve, reject) => {
    collection
      .insertOne(object)
      .then((obj: object) => {
        resolve(obj);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

functionsMongo.update = (collection: any, _id: string | null, object: object) => {
  return new Promise((resolve, reject) => {
    collection
      .findOne({ _id: _id })
      .then((obj: any) => {
        collection
          .updateOne({ _id: obj._id }, object)
          .then(() => {
            resolve({ ...object, _id: _id });
            return;
          })
          .catch((err: any) => {
            reject(err);
            return;
          });
      })
      .catch((err: any) => {
        reject(err);
        return;
      });
  });
};

functionsMongo.delete = (collection: any, _id: string | null) => {
  return new Promise((resolve, reject) => {
    collection
      .findOne({ _id: _id })
      .then(() => {
        collection
          .deleteOne({ _id: _id })
          .then(() => {
            resolve({});
            return;
          })
          .catch((err: any) => {
            reject(err);
            return;
          });
      })
      .catch((err: any) => {
        reject(err);
        return;
      });
  });
};

functionsMongo.deleteMany = (collection: any, ids: Array<string | null>) => {
  return new Promise((resolve, reject) => {
    collection.deleteMany({ _id: { $in: ids } }, (err: any) => {
      if (err) reject(err);
      else resolve(null);
      return;
    });
  });
};

functionsMongo.find = (
  collection: any,
  object: object,
  populate: string | Array<{ path: string }> | null = null,
  sortObject: string | null = null
) => {
  return new Promise((resolve, reject) => {
    collection
      .find(object)
      .lean()
      .sort(sortObject)
      .populate(populate)
      .then((objs: Array<object>) => {
        resolve(objs);
        return;
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

functionsMongo.findOne = (
  collection: any,
  object: object,
  populate: string | Array<{ path: string }> | null = null
) => {
  return new Promise((resolve, reject) => {
    collection
      .findOne(object)
      .lean()
      .populate(populate)
      .then((obj: object) => {
        resolve(obj);
        return;
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export { functionsMongo };
