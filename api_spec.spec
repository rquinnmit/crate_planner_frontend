# API Specification: Counter Concept

**Purpose:** count the number of occurrences of something

---

## API Endpoints

### POST /api/Counter/increment

**Description:** Increments the internal count by one.

**Requirements:**
- true

**Effects:**
- count := count + 1

**Request Body:**
```json
{}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```
---
### POST /api/Counter/decrement

**Description:** Decrements the internal count by one.

**Requirements:**
- count > 0

**Effects:**
- count := count - 1

**Request Body:**
```json
{}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```
---
### POST /api/Counter/reset

**Description:** Resets the internal count to zero.

**Requirements:**
- true

**Effects:**
- count := 0

**Request Body:**
```json
{}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```
---