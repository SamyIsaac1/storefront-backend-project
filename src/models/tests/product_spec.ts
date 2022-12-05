import { Product, ProductStore } from '../product';

const store = new ProductStore();
const product: Product = {
  name: 'Shirt',
  price: 10,
};
describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
  beforeAll(async () => {
    await store.create(product);
  });
  it('create method should add a product', async () => {
    const { name, price } = await store.show(1);
    expect({ name, price }).toEqual({
      name: 'Shirt',
      price: 10,
    });
  });

  it('index method should return a list of products', async () => {
    const products = await store.index();
    const { name, price } = products[0];
    expect({ name, price }).toEqual({
      name: 'Shirt',
      price: 10,
    });
  });

  it('show method should return the correct product', async () => {
    const { name, price } = await store.show(1);
    expect({ name, price }).toEqual({
      name: 'Shirt',
      price: 10,
    });
  });

  it('delete method should remove the product', async () => {
    await store.create(product);
    const products = await store.delete(2);

    expect(products).toEqual(undefined);
  });
});
