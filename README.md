### Full Stack: Angular & Java Spring Boot E-Commerce Website

**Starter Files**
- Includes database setup scripts
  - `01-create-user.sql` creates MySQL user for application
  - `02-create-products.sql` creates `product` & `product_Category` table & load tables with sample data

**Backend: Spring Boot**
- `Product` class
  - Includes all fields that will be mapped into database table `product`
  - Added appropiate annotations to each field to map into corresponding column
  - Added many to one relationship

- `ProductCategory` class
  - Includes 2 fields that will be mapped into database table `product_category`
  - Added appropiate annotations to each field to map into corresponding column
  - Added one to many relationship

- `ProductRepository` & `ProductCategoryRepository` interfaces
  - Defines repository interfaces for automatic REST endpoint generation
  - By default => Spring Data REST will create endpoints based on entity provided

- `MyDataRestConfig` class
  - Configuration class to disable HTTP methods POST, PUT, DELETE for `Product` & `ProductCategory`

**Frontend: Angular**
- `product.ts`: Product TypeScript Class
  - Includes product properties matching REST API response
  - Used constructor parameter properties to automatically declare and assign fields

- `product.service.ts`: Product Service to call REST APIs
  - TypeScript helper class running on client responsible for calling backend APIs
  - Makes request to backend url -> grabs data & unwraps -> makes it available as an array of products