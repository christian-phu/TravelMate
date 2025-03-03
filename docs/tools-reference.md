# Tools Reference

This document provides a detailed reference for all tools available to the TravelMate AI agents. Tools are specialized functions that agents can use to gather information, perform actions, and interact with external systems.

## Tool Categories

The tools are organized into the following categories:

1. [Search Tools](#search-tools) - Tools for finding information
2. [Reservation Tools](#reservation-tools) - Tools for booking flights, hotels, etc.
3. [Weather Tools](#weather-tools) - Tools for checking weather conditions
4. [Calendar Tools](#calendar-tools) - Tools for scheduling and calendar management
5. [Memory Tools](#memory-tools) - Tools for storing and retrieving context
6. [Navigation Tools](#navigation-tools) - Tools for mapping and directions
7. [Communication Tools](#communication-tools) - Tools for messaging and notifications
8. [Utility Tools](#utility-tools) - Miscellaneous helper tools

## Common Parameters

Many tools share common parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | string | The ID of the user making the request |
| `run_id` | string | The ID of the current agent run |
| `location` | object | Geographic coordinates with `latitude` and `longitude` |
| `date_range` | object | Date range with `start_date` and `end_date` |

## Search Tools

### web_search

Performs a web search and returns relevant results.

**Parameters:**
```json
{
  "query": "string",
  "num_results": "number (optional, default: 5)"
}
```

**Returns:**
```json
{
  "results": [
    {
      "title": "string",
      "url": "string",
      "snippet": "string"
    }
  ]
}
```

**Example:**
```json
// Request
{
  "query": "best time to visit Paris"
}

// Response
{
  "results": [
    {
      "title": "The Best Time to Visit Paris in 2023",
      "url": "https://example.com/paris-travel-guide",
      "snippet": "The best time to visit Paris is from April to June and October to early November when the weather is mild and the crowds are smaller..."
    }
  ]
}
```

### destination_search

Searches for travel destinations based on criteria.

**Parameters:**
```json
{
  "query": "string",
  "type": "string (optional: 'city', 'attraction', 'accommodation', 'restaurant')",
  "country": "string (optional)",
  "region": "string (optional)",
  "max_results": "number (optional, default: 10)"
}
```

**Returns:**
```json
{
  "destinations": [
    {
      "name": "string",
      "type": "string",
      "country": "string",
      "region": "string",
      "description": "string",
      "rating": "number",
      "image_url": "string",
      "latitude": "number",
      "longitude": "number"
    }
  ]
}
```

**Example:**
```json
// Request
{
  "query": "Eiffel Tower",
  "type": "attraction",
  "country": "France"
}

// Response
{
  "destinations": [
    {
      "name": "Eiffel Tower",
      "type": "attraction",
      "country": "France",
      "region": "Île-de-France",
      "description": "Iconic iron tower on the Champ de Mars in Paris...",
      "rating": 4.7,
      "image_url": "https://example.com/eiffel-tower.jpg",
      "latitude": 48.8584,
      "longitude": 2.2945
    }
  ]
}
```

## Reservation Tools

### hotel_search

Searches for available hotels.

**Parameters:**
```json
{
  "location": {
    "city": "string",
    "country": "string"
  },
  "date_range": {
    "check_in": "string (YYYY-MM-DD)",
    "check_out": "string (YYYY-MM-DD)"
  },
  "guests": {
    "adults": "number",
    "children": "number (optional, default: 0)"
  },
  "rooms": "number (optional, default: 1)",
  "price_range": {
    "min": "number (optional)",
    "max": "number (optional)"
  },
  "amenities": "array of strings (optional)",
  "star_rating": "number (optional)",
  "sort_by": "string (optional: 'price', 'rating', 'distance')"
}
```

**Returns:**
```json
{
  "hotels": [
    {
      "id": "string",
      "name": "string",
      "address": "string",
      "star_rating": "number",
      "user_rating": "number",
      "price_per_night": "number",
      "currency": "string",
      "available": "boolean",
      "amenities": "array of strings",
      "image_url": "string",
      "latitude": "number",
      "longitude": "number",
      "distance_to_center": "number (kilometers)"
    }
  ],
  "total_results": "number"
}
```

**Example:**
```json
// Request
{
  "location": {
    "city": "Paris",
    "country": "France"
  },
  "date_range": {
    "check_in": "2023-06-10",
    "check_out": "2023-06-15"
  },
  "guests": {
    "adults": 2
  },
  "price_range": {
    "max": 200
  },
  "amenities": ["wifi", "breakfast"],
  "sort_by": "price"
}

// Response
{
  "hotels": [
    {
      "id": "hotel123",
      "name": "Hotel Rivoli",
      "address": "15 Rue de Rivoli, 75004 Paris, France",
      "star_rating": 3,
      "user_rating": 4.2,
      "price_per_night": 150,
      "currency": "EUR",
      "available": true,
      "amenities": ["wifi", "breakfast", "air_conditioning"],
      "image_url": "https://example.com/hotel-rivoli.jpg",
      "latitude": 48.8566,
      "longitude": 2.3522,
      "distance_to_center": 0.8
    }
  ],
  "total_results": 1
}
```

### flight_search

Searches for available flights.

**Parameters:**
```json
{
  "trip_type": "string ('one_way', 'round_trip', 'multi_city')",
  "origin": {
    "airport_code": "string",
    "city": "string (optional)"
  },
  "destination": {
    "airport_code": "string",
    "city": "string (optional)"
  },
  "departure_date": "string (YYYY-MM-DD)",
  "return_date": "string (YYYY-MM-DD, optional for round_trip)",
  "passengers": {
    "adults": "number",
    "children": "number (optional, default: 0)",
    "infants": "number (optional, default: 0)"
  },
  "cabin_class": "string (optional: 'economy', 'premium_economy', 'business', 'first')",
  "max_price": "number (optional)",
  "flexible_dates": "boolean (optional, default: false)",
  "direct_flights_only": "boolean (optional, default: false)"
}
```

**Returns:**
```json
{
  "flights": [
    {
      "id": "string",
      "airline": "string",
      "flight_number": "string",
      "origin": {
        "airport_code": "string",
        "airport_name": "string",
        "city": "string",
        "country": "string"
      },
      "destination": {
        "airport_code": "string",
        "airport_name": "string",
        "city": "string",
        "country": "string"
      },
      "departure": {
        "date": "string (YYYY-MM-DD)",
        "time": "string (HH:MM)",
        "timezone": "string"
      },
      "arrival": {
        "date": "string (YYYY-MM-DD)",
        "time": "string (HH:MM)",
        "timezone": "string"
      },
      "duration": "number (minutes)",
      "stops": "number",
      "price": {
        "amount": "number",
        "currency": "string"
      },
      "cabin_class": "string",
      "seats_available": "number"
    }
  ],
  "total_results": "number"
}
```

**Example:**
```json
// Request
{
  "trip_type": "round_trip",
  "origin": {
    "airport_code": "JFK",
    "city": "New York"
  },
  "destination": {
    "airport_code": "CDG",
    "city": "Paris"
  },
  "departure_date": "2023-06-10",
  "return_date": "2023-06-17",
  "passengers": {
    "adults": 2
  },
  "cabin_class": "economy",
  "direct_flights_only": true
}

// Response
{
  "flights": [
    {
      "id": "flight456",
      "airline": "Air France",
      "flight_number": "AF123",
      "origin": {
        "airport_code": "JFK",
        "airport_name": "John F. Kennedy International Airport",
        "city": "New York",
        "country": "United States"
      },
      "destination": {
        "airport_code": "CDG",
        "airport_name": "Charles de Gaulle Airport",
        "city": "Paris",
        "country": "France"
      },
      "departure": {
        "date": "2023-06-10",
        "time": "19:30",
        "timezone": "EDT"
      },
      "arrival": {
        "date": "2023-06-11",
        "time": "08:45",
        "timezone": "CEST"
      },
      "duration": 440,
      "stops": 0,
      "price": {
        "amount": 850,
        "currency": "USD"
      },
      "cabin_class": "economy",
      "seats_available": 12
    }
  ],
  "total_results": 1
}
```

### make_reservation

Books a hotel, flight, or attraction.

**Parameters:**
```json
{
  "reservation_type": "string ('hotel', 'flight', 'attraction')",
  "item_id": "string",
  "user_details": {
    "name": "string",
    "email": "string",
    "phone": "string (optional)"
  },
  "payment_method": {
    "type": "string ('credit_card', 'paypal')",
    "token": "string"
  },
  "special_requests": "string (optional)"
}
```

**Returns:**
```json
{
  "reservation_id": "string",
  "status": "string ('confirmed', 'pending', 'failed')",
  "details": {
    // Varies based on reservation_type
  },
  "confirmation_code": "string",
  "total_price": {
    "amount": "number",
    "currency": "string"
  }
}
```

**Example:**
```json
// Request
{
  "reservation_type": "hotel",
  "item_id": "hotel123",
  "user_details": {
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "+1-555-123-4567"
  },
  "payment_method": {
    "type": "credit_card",
    "token": "pmt_token_789"
  },
  "special_requests": "Non-smoking room, high floor"
}

// Response
{
  "reservation_id": "res_abc123",
  "status": "confirmed",
  "details": {
    "hotel_name": "Hotel Rivoli",
    "check_in": "2023-06-10",
    "check_out": "2023-06-15",
    "room_type": "Deluxe Double",
    "guests": 2
  },
  "confirmation_code": "HR78901",
  "total_price": {
    "amount": 750,
    "currency": "EUR"
  }
}
```

## Weather Tools

### get_weather_forecast

Retrieves weather forecast for a location.

**Parameters:**
```json
{
  "location": {
    "city": "string",
    "country": "string (optional)",
    "latitude": "number (optional)",
    "longitude": "number (optional)"
  },
  "date_range": {
    "start_date": "string (YYYY-MM-DD)",
    "end_date": "string (YYYY-MM-DD, optional)"
  },
  "units": "string (optional: 'metric', 'imperial', default: 'metric')"
}
```

**Returns:**
```json
{
  "location": {
    "city": "string",
    "country": "string",
    "latitude": "number",
    "longitude": "number"
  },
  "forecast": [
    {
      "date": "string (YYYY-MM-DD)",
      "condition": "string",
      "description": "string",
      "temperature": {
        "min": "number",
        "max": "number",
        "morning": "number",
        "day": "number",
        "evening": "number",
        "night": "number"
      },
      "humidity": "number (percentage)",
      "precipitation": {
        "probability": "number (percentage)",
        "amount": "number (mm)"
      },
      "wind": {
        "speed": "number",
        "direction": "string"
      },
      "uv_index": "number"
    }
  ],
  "units": "string"
}
```

**Example:**
```json
// Request
{
  "location": {
    "city": "Paris",
    "country": "France"
  },
  "date_range": {
    "start_date": "2023-06-10",
    "end_date": "2023-06-15"
  },
  "units": "metric"
}

// Response
{
  "location": {
    "city": "Paris",
    "country": "France",
    "latitude": 48.8566,
    "longitude": 2.3522
  },
  "forecast": [
    {
      "date": "2023-06-10",
      "condition": "Partly Cloudy",
      "description": "Partly cloudy throughout the day",
      "temperature": {
        "min": 15,
        "max": 24,
        "morning": 16,
        "day": 23,
        "evening": 21,
        "night": 15
      },
      "humidity": 65,
      "precipitation": {
        "probability": 20,
        "amount": 0
      },
      "wind": {
        "speed": 12,
        "direction": "NW"
      },
      "uv_index": 6
    }
  ],
  "units": "metric"
}
```

## Calendar Tools

### add_calendar_event

Adds an event to the user's calendar.

**Parameters:**
```json
{
  "title": "string",
  "description": "string (optional)",
  "location": {
    "name": "string",
    "address": "string (optional)",
    "latitude": "number (optional)",
    "longitude": "number (optional)"
  },
  "start": {
    "date": "string (YYYY-MM-DD)",
    "time": "string (HH:MM, optional)",
    "timezone": "string (optional)"
  },
  "end": {
    "date": "string (YYYY-MM-DD)",
    "time": "string (HH:MM, optional)",
    "timezone": "string (optional)"
  },
  "all_day": "boolean (optional, default: false)",
  "reminders": [
    {
      "type": "string ('email', 'notification')",
      "minutes_before": "number"
    }
  ],
  "calendar_id": "string (optional)"
}
```

**Returns:**
```json
{
  "event_id": "string",
  "status": "string ('confirmed', 'tentative', 'cancelled')",
  "html_link": "string (URL to view event)"
}
```

**Example:**
```json
// Request
{
  "title": "Visit Eiffel Tower",
  "description": "Guided tour of the Eiffel Tower",
  "location": {
    "name": "Eiffel Tower",
    "address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
    "latitude": 48.8584,
    "longitude": 2.2945
  },
  "start": {
    "date": "2023-06-12",
    "time": "10:00",
    "timezone": "Europe/Paris"
  },
  "end": {
    "date": "2023-06-12",
    "time": "12:30",
    "timezone": "Europe/Paris"
  },
  "reminders": [
    {
      "type": "notification",
      "minutes_before": 60
    }
  ]
}

// Response
{
  "event_id": "event789",
  "status": "confirmed",
  "html_link": "https://calendar.example.com/event?id=event789"
}
```

### get_calendar_events

Retrieves events from the user's calendar.

**Parameters:**
```json
{
  "date_range": {
    "start_date": "string (YYYY-MM-DD)",
    "end_date": "string (YYYY-MM-DD)"
  },
  "calendar_id": "string (optional)",
  "max_results": "number (optional, default: 10)"
}
```

**Returns:**
```json
{
  "events": [
    {
      "event_id": "string",
      "title": "string",
      "description": "string",
      "location": {
        "name": "string",
        "address": "string",
        "latitude": "number",
        "longitude": "number"
      },
      "start": {
        "date": "string (YYYY-MM-DD)",
        "time": "string (HH:MM)",
        "timezone": "string"
      },
      "end": {
        "date": "string (YYYY-MM-DD)",
        "time": "string (HH:MM)",
        "timezone": "string"
      },
      "all_day": "boolean",
      "status": "string"
    }
  ],
  "next_page_token": "string (optional)"
}
```

**Example:**
```json
// Request
{
  "date_range": {
    "start_date": "2023-06-10",
    "end_date": "2023-06-15"
  },
  "max_results": 5
}

// Response
{
  "events": [
    {
      "event_id": "event789",
      "title": "Visit Eiffel Tower",
      "description": "Guided tour of the Eiffel Tower",
      "location": {
        "name": "Eiffel Tower",
        "address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
        "latitude": 48.8584,
        "longitude": 2.2945
      },
      "start": {
        "date": "2023-06-12",
        "time": "10:00",
        "timezone": "Europe/Paris"
      },
      "end": {
        "date": "2023-06-12",
        "time": "12:30",
        "timezone": "Europe/Paris"
      },
      "all_day": false,
      "status": "confirmed"
    }
  ]
}
```

## Memory Tools

### save_memory

Saves information to the agent's memory.

**Parameters:**
```json
{
  "content": "string",
  "type": "string ('preference', 'fact', 'history')",
  "metadata": {
    "source": "string (optional)",
    "category": "string (optional)",
    "tags": "array of strings (optional)"
  },
  "relevance_score": "number (optional, 0-1, default: 0.5)"
}
```

**Returns:**
```json
{
  "memory_id": "string",
  "status": "string ('stored', 'error')"
}
```

**Example:**
```json
// Request
{
  "content": "User prefers boutique hotels with free breakfast",
  "type": "preference",
  "metadata": {
    "category": "accommodation",
    "tags": ["hotel", "breakfast", "boutique"]
  },
  "relevance_score": 0.8
}

// Response
{
  "memory_id": "mem_456",
  "status": "stored"
}
```

### retrieve_memories

Retrieves information from the agent's memory.

**Parameters:**
```json
{
  "query": "string",
  "types": "array of strings (optional)",
  "max_results": "number (optional, default: 5)",
  "min_relevance": "number (optional, 0-1)"
}
```

**Returns:**
```json
{
  "memories": [
    {
      "memory_id": "string",
      "content": "string",
      "type": "string",
      "created_at": "string (ISO date)",
      "metadata": "object",
      "relevance_score": "number"
    }
  ],
  "total_results": "number"
}
```

**Example:**
```json
// Request
{
  "query": "hotel preferences",
  "types": ["preference"],
  "max_results": 3,
  "min_relevance": 0.6
}

// Response
{
  "memories": [
    {
      "memory_id": "mem_456",
      "content": "User prefers boutique hotels with free breakfast",
      "type": "preference",
      "created_at": "2023-05-15T14:32:10Z",
      "metadata": {
        "category": "accommodation",
        "tags": ["hotel", "breakfast", "boutique"]
      },
      "relevance_score": 0.8
    }
  ],
  "total_results": 1
}
```

## Navigation Tools

### get_directions

Gets directions between locations.

**Parameters:**
```json
{
  "origin": {
    "name": "string (optional)",
    "address": "string (optional)",
    "latitude": "number (optional)",
    "longitude": "number (optional)"
  },
  "destination": {
    "name": "string (optional)",
    "address": "string (optional)",
    "latitude": "number (optional)",
    "longitude": "number (optional)"
  },
  "waypoints": [
    {
      "name": "string (optional)",
      "address": "string (optional)",
      "latitude": "number (optional)",
      "longitude": "number (optional)"
    }
  ],
  "mode": "string (optional: 'driving', 'walking', 'bicycling', 'transit', default: 'driving')",
  "departure_time": {
    "date": "string (YYYY-MM-DD)",
    "time": "string (HH:MM)",
    "timezone": "string"
  },
  "avoid": "array of strings (optional: 'tolls', 'highways', 'ferries')",
  "units": "string (optional: 'metric', 'imperial', default: 'metric')"
}
```

**Returns:**
```json
{
  "routes": [
    {
      "summary": "string",
      "distance": {
        "value": "number",
        "text": "string"
      },
      "duration": {
        "value": "number (seconds)",
        "text": "string"
      },
      "fare": {
        "currency": "string",
        "value": "number"
      },
      "legs": [
        {
          "start_location": {
            "name": "string",
            "address": "string",
            "latitude": "number",
            "longitude": "number"
          },
          "end_location": {
            "name": "string",
            "address": "string",
            "latitude": "number",
            "longitude": "number"
          },
          "distance": {
            "value": "number",
            "text": "string"
          },
          "duration": {
            "value": "number (seconds)",
            "text": "string"
          },
          "steps": [
            {
              "instruction": "string",
              "distance": {
                "value": "number",
                "text": "string"
              },
              "duration": {
                "value": "number (seconds)",
                "text": "string"
              },
              "mode": "string"
            }
          ]
        }
      ]
    }
  ]
}
```

**Example:**
```json
// Request
{
  "origin": {
    "name": "Hotel Rivoli",
    "address": "15 Rue de Rivoli, 75004 Paris, France"
  },
  "destination": {
    "name": "Eiffel Tower",
    "address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France"
  },
  "mode": "transit",
  "departure_time": {
    "date": "2023-06-12",
    "time": "09:00",
    "timezone": "Europe/Paris"
  }
}

// Response
{
  "routes": [
    {
      "summary": "Metro Line 1, Metro Line 6",
      "distance": {
        "value": 5400,
        "text": "5.4 km"
      },
      "duration": {
        "value": 1800,
        "text": "30 minutes"
      },
      "fare": {
        "currency": "EUR",
        "value": 1.90
      },
      "legs": [
        {
          "start_location": {
            "name": "Hotel Rivoli",
            "address": "15 Rue de Rivoli, 75004 Paris, France",
            "latitude": 48.8563,
            "longitude": 2.3528
          },
          "end_location": {
            "name": "Eiffel Tower",
            "address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
            "latitude": 48.8584,
            "longitude": 2.2945
          },
          "distance": {
            "value": 5400,
            "text": "5.4 km"
          },
          "duration": {
            "value": 1800,
            "text": "30 minutes"
          },
          "steps": [
            {
              "instruction": "Walk to Hôtel de Ville station",
              "distance": {
                "value": 200,
                "text": "200 m"
              },
              "duration": {
                "value": 180,
                "text": "3 minutes"
              },
              "mode": "walking"
            },
            {
              "instruction": "Take Metro Line 1 towards La Défense",
              "distance": {
                "value": 3200,
                "text": "3.2 km"
              },
              "duration": {
                "value": 720,
                "text": "12 minutes"
              },
              "mode": "transit"
            },
            {
              "instruction": "Transfer to Metro Line 6 at Charles de Gaulle-Étoile",
              "distance": {
                "value": 100,
                "text": "100 m"
              },
              "duration": {
                "value": 300,
                "text": "5 minutes"
              },
              "mode": "walking"
            },
            {
              "instruction": "Take Metro Line 6 towards Nation",
              "distance": {
                "value": 1500,
                "text": "1.5 km"
              },
              "duration": {
                "value": 360,
                "text": "6 minutes"
              },
              "mode": "transit"
            },
            {
              "instruction": "Walk to Eiffel Tower",
              "distance": {
                "value": 400,
                "text": "400 m"
              },
              "duration": {
                "value": 240,
                "text": "4 minutes"
              },
              "mode": "walking"
            }
          ]
        }
      ]
    }
  ]
}
```

## Communication Tools

### send_notification

Sends a notification to the user.

**Parameters:**
```json
{
  "channel": "string ('email', 'push', 'sms')",
  "priority": "string (optional: 'high', 'normal', 'low', default: 'normal')",
  "title": "string",
  "message": "string",
  "data": "object (optional)",
  "action_url": "string (optional)"
}
```

**Returns:**
```json
{
  "notification_id": "string",
  "status": "string ('sent', 'queued', 'failed')",
  "timestamp": "string (ISO date)"
}
```

**Example:**
```json
// Request
{
  "channel": "push",
  "priority": "high",
  "title": "Flight Delay Alert",
  "message": "Your flight AF123 has been delayed by 45 minutes. New departure time: 20:15.",
  "data": {
    "flight_id": "AF123",
    "original_time": "19:30",
    "new_time": "20:15"
  },
  "action_url": "app://flight-status/AF123"
}

// Response
{
  "notification_id": "notif_abc123",
  "status": "sent",
  "timestamp": "2023-06-10T15:42:18Z"
}
```

## Utility Tools

### currency_convert

Converts between currencies.

**Parameters:**
```json
{
  "amount": "number",
  "from_currency": "string (ISO currency code)",
  "to_currency": "string (ISO currency code)"
}
```

**Returns:**
```json
{
  "from": {
    "amount": "number",
    "currency": "string"
  },
  "to": {
    "amount": "number",
    "currency": "string"
  },
  "rate": "number",
  "timestamp": "string (ISO date)"
}
```

**Example:**
```json
// Request
{
  "amount": 100,
  "from_currency": "USD",
  "to_currency": "EUR"
}

// Response
{
  "from": {
    "amount": 100,
    "currency": "USD"
  },
  "to": {
    "amount": 93.25,
    "currency": "EUR"
  },
  "rate": 0.9325,
  "timestamp": "2023-06-10T12:00:00Z"
}
```

### translate_text

Translates text between languages.

**Parameters:**
```json
{
  "text": "string",
  "source_language": "string (ISO language code, optional - auto-detect if not provided)",
  "target_language": "string (ISO language code)"
}
```

**Returns:**
```json
{
  "translated_text": "string",
  "source_language": "string",
  "target_language": "string"
}
```

**Example:**
```json
// Request
{
  "text": "Hello, how are you?",
  "target_language": "fr"
}

// Response
{
  "translated_text": "Bonjour, comment allez-vous ?",
  "source_language": "en",
  "target_language": "fr"
}
```

## Best Practices

1. **Tool Selection**: Choose the most specific tool for the task
2. **Error Handling**: Always check tool responses for errors or unexpected results
3. **Chaining Tools**: Complex tasks often require using multiple tools in sequence
4. **Parameter Validation**: Validate parameters before calling tools to prevent errors
5. **Rate Limiting**: Be aware of rate limits for external API-dependent tools

## Extending with New Tools

To develop new tools for the platform, follow these steps:

1. Define the tool schema in `platform/agent_platform/web/api/agent/tools/`
2. Implement the tool handler function
3. Register the tool in the tool registry
4. Update prompts to make agents aware of the new tool
5. Add documentation in this reference 