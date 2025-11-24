# 💧 Hydration Tracking API

## Why Hydration Tracking?

Hydration tracking is one of the most critical daily habits for people with Sickle Cell Disease. Dehydration can trigger or worsen pain crises, so even small reminders can significantly reduce the chances of painful sickle cell crises.

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Start the Server

```bash
node server.js
```

**Server URL:** `http://localhost:5001`  
**Base Endpoint:** `/api/hydration`

---

## 🧪 Testing Guide

### Using cURL

#### ✅ Test 1: Add Water Entry

```bash
curl -X POST http://localhost:5001/api/hydration \
  -H "Content-Type: application/json" \
  -d '{"amount_litres": 0.5, "drink_type": "water", "notes": "Morning hydration"}'
```

#### ☕ Test 2: Add Tea Entry

```bash
curl -X POST http://localhost:5001/api/hydration \
  -H "Content-Type: application/json" \
  -d '{"amount_litres": 0.3, "drink_type": "tea", "notes": "Afternoon tea break"}'
```

#### ☕ Test 3: Add Coffee Entry

```bash
curl -X POST http://localhost:5001/api/hydration \
  -H "Content-Type: application/json" \
  -d '{"amount_litres": 0.25, "drink_type": "coffee", "notes": "Need some caffeine"}'
```

#### 💧 Test 4: Add Water Without Notes

```bash
curl -X POST http://localhost:5001/api/hydration \
  -H "Content-Type: application/json" \
  -d '{"amount_litres": 0.75, "drink_type": "water"}'
```

#### ❌ Test 5: Invalid Amount (Negative Value)

```bash
curl -X POST http://localhost:5001/api/hydration \
  -H "Content-Type: application/json" \
  -d '{"amount_litres": -0.5, "drink_type": "water"}'
```

**Expected Response (400):**
```json
{
  "error": "Amount in litres is required and must be greater than 0"
}
```

#### ❌ Test 6: Invalid Drink Type

```bash
curl -X POST http://localhost:5001/api/hydration \
  -H "Content-Type: application/json" \
  -d '{"amount_litres": 0.5, "drink_type": "beer"}'
```

**Expected Response (400):**
```json
{
  "error": "Invalid drink type. Must be one of: water, tea, coffee, juice, milk, soda, sports drink, other"
}
```

#### 📊 Test 7: Get Current Hydration Status

```bash
curl http://localhost:5001/api/hydration
```

**Sample Response:**
```json
{
  "success": true,
  "lastEntry": { ... },
  "reminder": { ... },
  "dailyGoal": {
    "target": 2,
    "consumed": 1.55,
    "remaining": 0.45,
    "percentage": 77.5
  },
  "todayEntries": [ ... ]
}
```

---

## 📮 Testing with Postman

### POST /api/hydration

1. Open Postman
2. Select **POST** as the method
3. Set URL to: `http://localhost:5001/api/hydration`
4. Go to the **Body** tab
5. Select **raw** and choose **JSON**
6. Enter the following JSON:

```json
{
  "amount_litres": 0.5,
  "drink_type": "water",
  "notes": "Morning hydration"
}
```

7. Click **Send**

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Hydration entry added successfully",
  "entry": {
    "id": 1,
    "amount_litres": 0.5,
    "timestamp": "...",
    "drink_type": "water",
    "notes": "Morning hydration"
  }
}
```

### GET /api/hydration

1. Create a new request in Postman
2. Set method to **GET**
3. Set URL to: `http://localhost:5001/api/hydration`
4. Click **Send**

**Response includes:**
- `lastEntry` - Most recent drink logged
- `reminder` - Hydration status (urgent, warning, reminder, or good)
- `dailyGoal` - Target, consumed, remaining, and percentage
- `todayEntries` - All drinks logged today

---

## 🧠 Insight Logic

The hydration app analyzes the time since your last drink and provides intelligent feedback based on your hydration state.

### 🔴 Urgent (6+ hours)

**Trigger:** 6 hours or more since last drink  
**Message Type:** Strong and direct  
**Action:** Hydrate immediately  
**Examples:** 6 hours, 7 hours, 10 hours, 24 hours

This is the highest alert level and represents a high-risk situation, especially for sickle cell patients.

### 🟡 Warning (4-6 hours)

**Trigger:** Between 4 and 6 hours since last drink  
**Message Type:** Encouraging but firm  
**Action:** Drink soon before it becomes urgent  
**Examples:** 4.1 hours, 5 hours, 5.9 hours

Approaching a dangerous zone—action needed before escalation.

### 🟠 Reminder (3-4 hours)

**Trigger:** Between 3 and 4 hours since last drink  
**Message Type:** Gentle prompt  
**Action:** Maintain consistency  
**Examples:** 3 hours, 3.5 hours, 3.9 hours

Early dehydration prevention to keep you on track.

### 🟢 Good (< 3 hours)

**Trigger:** Less than 3 hours since last drink  
**Message Type:** Reassuring and positive  
**Action:** Keep it up!  
**Examples:** 0.5 hours, 1 hour, 2 hours, 2.9 hours

You're maintaining healthy hydration habits.

### ⚪ No Entries Yet

**Trigger:** No drinks logged  
**Message Type:** Urgent prompt  
**Action:** Start hydrating immediately

When no timestamp exists, the system treats this as urgent to ensure feedback is always provided.

---

## 🎯 Valid Drink Types

- water
- tea
- coffee
- juice
- milk
- soda
- sports drink
- other

---
