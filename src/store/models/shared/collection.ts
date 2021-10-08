export type CollectionModel<Key extends string | number, T> = {
  order: Key[];
  entities: Record<Key, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normilizeCollection = <Key extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => Key
): CollectionModel<Key, T> => {
  const collection: CollectionModel<Key, T> = getInitialCollectionModel();

  elements.forEach((elem) => {
    const id = getKeyForElement(elem);
    collection.order.push(id);
    collection.entities[id] = elem;
  });

  return collection;
};

export const normilizeElementsAndCollection = <
  Key extends string | number,
  T,
  NormalizedT
>(
  elements: T[],
  getKeyForElement: (element: NormalizedT) => Key,
  elementNormalizer: (element: T) => NormalizedT
): CollectionModel<Key, NormalizedT> => {
  const collection: CollectionModel<Key, NormalizedT> =
    getInitialCollectionModel();

  elements.forEach((elem) => {
    const normalizedElem = elementNormalizer(elem);
    const id = getKeyForElement(normalizedElem);
    collection.order.push(id);
    collection.entities[id] = elementNormalizer(elem);
  });

  return collection;
};

export const concatCollections = <Key extends string | number, T>(
  currentCollection: CollectionModel<Key, T>,
  additioalCollection: CollectionModel<Key, T>
): CollectionModel<Key, T> => {
  const resultOrder: Key[] = currentCollection.order.concat(
    additioalCollection.order
  );

  const resultEntities: Record<Key, T> = currentCollection.entities;
  additioalCollection.order.map(
    (id) => (resultEntities[id] = additioalCollection.entities[id])
  );

  const resultCollection: CollectionModel<Key, T> = {
    order: resultOrder,
    entities: resultEntities,
  };

  return resultCollection;
};

export const linearizeCollection = <Key extends string | number, T>(
  elements: CollectionModel<Key, T>
): T[] => elements.order.map((id) => elements.entities[id]);
