# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

## API Endpoints

#### Products

- Index- **/products** [GET]
- Show - **/products/:id** [GET]
- Create [token required] - **/products** [POST]
- Delete [token required] -**/products** [DELETE]

#### Users

- Index [token required] - **/users**[(GET]
- Show [token required] - **/users/:id** [GET]
- Create N[token required] - **/users/create** [POST]
- Login - **/users/login** [POST]

#### Orders

- Show (GET) [token required] (user_id) - **/orders/:id** [GET]
- Create (POST) [token required] - **/orders** [POST]
- Delete (DELETE) [token required] - **/orders/:id**[DELETE]
- Create (POST) orderProduct [token required] - **/orders/:id/products/** [POST]

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstname
- lastname
- username
- password

#### Order

- id
- user_id
- status of order (active or complete)

#### Order_Product

- id
- quantity of each product in the order
- id of each order
- id of each product in the order

#### Shema

![Schema](/Schema.bmp)
