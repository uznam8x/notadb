# Notadb
Notadb is a shortened for "Not a database".  
This library is you can do duck typing using a set schema.

## Install
```bash
yarn add notadb
```
## How to use
```typescript
import {Model} from 'notadb';

const post = new Model([{ id: 2 }]);
const res = post.find(2);

// res => {"id":2,"key":"","link":"","type":"post","author":{},"subject":"","description":"","thumbnail":"","media":[],"properties":{},"metadata":[],"relations":[],"createdAt":"1977-01-01T00:00:00.0000","updatedAt":"1977-01-01T00:00:00.0000"}

```

## Schema
| key         | type       | default          | description      |
| ----------- | ---------- | ---------------- | ---------------- |
| id          | number     | -1               | primary key      |
| key         | string     | ''               | hash key         |
| link        | string     | ''               | page link        |
| type        | string     | post             | post type        |
| subject     | string     | ''               | subject          |
| description | string     | ''               | description      |
| thumbnail   | string     | ''               | image url        |
| media       | Media      | []               | Media type       |
| metadata    | Metadata[] | []               |                  |
| properties  | property   | {}               |                  |
| relations   | Record[]   | []               | relations record |
| createdAt   | Date       | current datetime | create datetime  |
| updatedAt   | Date       | current datetime | updated datetime |

## Collection
### find
```typescript
// find by id
post.find(2) // return Record
```
### findBy
```typescript
post.findBy('id', 2) // return Record
```
### findAll
```typescript
post.findAll('id', 2) // return Record[]
```