// js/src/generated/contract.ts
var CONTRACTS = {
  "AlarmBanner": {
    "className": "AlarmBanner",
    "kind": "alarmbanner",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "alarmbanner"
        ],
        "default": "alarmbanner",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          520,
          180
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "timestamp": {
              "type": "string"
            },
            "source": {
              "type": "string"
            },
            "priority": {
              "type": "enum",
              "values": [
                "low",
                "medium",
                "high",
                "critical"
              ]
            },
            "message": {
              "type": "string"
            },
            "state": {
              "type": "enum",
              "values": [
                "normal",
                "active_unacknowledged",
                "active_acknowledged",
                "cleared_unacknowledged"
              ]
            }
          }
        },
        "default": [],
        "writer": "derived",
        "readOnly": true,
        "description": "Alarms that are not back to normal, {id, timestamp, source, priority, message, state}; the view sorts them (unacknowledged first, then priority and time). Written by the host (Python: raise_alarm(), clear_alarm()); without a host owning the state, the front end applies the acknowledgements (an alarm back to normal leaves the list) and writes the list back (HOST-004, HOST-012)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "ack",
        "direction": "front-to-host",
        "description": "ACK of one alarm.",
        "fields": {
          "alarm_id": {
            "type": "string"
          }
        },
        "buffers": []
      },
      {
        "type": "ack_all",
        "direction": "front-to-host",
        "description": "ACK ALL.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "AlarmIndicator": {
    "className": "AlarmIndicator",
    "kind": "alarmindicator",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "alarmindicator"
        ],
        "default": "alarmindicator",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          260,
          64
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "alarm_id": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identifier passed to the acknowledgement callbacks."
      },
      "message": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Alarm message (plain text, SEC-002)."
      },
      "priority": {
        "type": "enum",
        "values": [
          "low",
          "medium",
          "high",
          "critical"
        ],
        "default": "high",
        "writer": "host",
        "description": "Priority, shown by a shape and a P1 .. P4 text as well as a color (A11Y-003)."
      },
      "value": {
        "type": "enum",
        "values": [
          "normal",
          "active_unacknowledged",
          "active_acknowledged",
          "cleared_unacknowledged"
        ],
        "default": "normal",
        "writer": "both",
        "transitions": [
          [
            "normal",
            "activate",
            "active_unacknowledged"
          ],
          [
            "cleared_unacknowledged",
            "activate",
            "active_unacknowledged"
          ],
          [
            "active_unacknowledged",
            "clear",
            "cleared_unacknowledged"
          ],
          [
            "active_acknowledged",
            "clear",
            "normal"
          ],
          [
            "active_unacknowledged",
            "acknowledge",
            "active_acknowledged"
          ],
          [
            "cleared_unacknowledged",
            "acknowledge",
            "normal"
          ]
        ],
        "description": "ISA-18.2 alarm state. Transitions (x-awi-transitions, [state, event, next]): activate and clear come from the host; acknowledge from the operator (ACK), applied by the host when it owns the state, otherwise by the front end, which always sends the ack message (HOST-012)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "ack",
        "direction": "front-to-host",
        "description": "The operator pressed ACK (control mode, not disabled).",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "AlarmList": {
    "className": "AlarmList",
    "kind": "alarmlist",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "alarmlist"
        ],
        "default": "alarmlist",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          640,
          240
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "timestamp": {
              "type": "string"
            },
            "source": {
              "type": "string"
            },
            "priority": {
              "type": "enum",
              "values": [
                "low",
                "medium",
                "high",
                "critical"
              ]
            },
            "message": {
              "type": "string"
            },
            "state": {
              "type": "enum",
              "values": [
                "normal",
                "active_unacknowledged",
                "active_acknowledged",
                "cleared_unacknowledged"
              ]
            },
            "shelved_until": {
              "nullable": true,
              "type": "string"
            },
            "suppressed": {
              "type": "boolean"
            },
            "out_of_service": {
              "type": "boolean"
            }
          }
        },
        "default": [],
        "writer": "derived",
        "readOnly": true,
        "description": "Alarms {id, timestamp, source, priority, message, state, shelved_until, suppressed, out_of_service}. Written by the host (Python: raise_alarm(), suppress(), ...); without a host owning the state, the front end applies acknowledgements, shelving and its expiry, and writes the list back (HOST-004, HOST-012)."
      },
      "shelve_durations": {
        "type": "array",
        "items": {
          "type": "number"
        },
        "default": [
          300,
          900,
          3600
        ],
        "writer": "host",
        "description": "Shelving durations offered, in seconds."
      },
      "max_shelve": {
        "type": "number",
        "minimum": 1,
        "default": 28800,
        "writer": "host",
        "description": "Longest shelving allowed, in seconds (IND-051)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "ack",
        "direction": "front-to-host",
        "description": "ACK of one alarm.",
        "fields": {
          "alarm_id": {
            "type": "string"
          }
        },
        "buffers": []
      },
      {
        "type": "shelve",
        "direction": "front-to-host",
        "description": "Shelve an alarm.",
        "fields": {
          "alarm_id": {
            "type": "string"
          },
          "seconds": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "unshelve",
        "direction": "front-to-host",
        "description": "Unshelve an alarm.",
        "fields": {
          "alarm_id": {
            "type": "string"
          }
        },
        "buffers": []
      }
    ]
  },
  "AnalogIndicator": {
    "className": "AnalogIndicator",
    "kind": "analogindicator",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "analogindicator"
        ],
        "default": "analogindicator",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          240,
          56
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels. The Python class uses (70, 220) when created vertical; other hosts give the size with the orientation."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "normal_hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Upper end of the normal operating range."
      },
      "normal_lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Lower end of the normal operating range, shaded on the scale (IND-002)."
      },
      "orientation": {
        "type": "enum",
        "values": [
          "horizontal",
          "vertical"
        ],
        "default": "horizontal",
        "writer": "host",
        "description": "Bar direction."
      },
      "target": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Desired value, marked on the scale."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Annunciator": {
    "className": "Annunciator",
    "kind": "annunciator",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "annunciator"
        ],
        "default": "annunciator",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          420,
          170
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "tag": {
              "type": "string"
            },
            "text": {
              "type": "string"
            },
            "color": {
              "type": "enum",
              "values": [
                "red",
                "amber",
                "white"
              ]
            },
            "active": {
              "type": "boolean"
            },
            "state": {
              "type": "enum",
              "values": [
                "normal",
                "alert",
                "acknowledged",
                "ringback"
              ]
            },
            "first": {
              "type": "boolean"
            }
          }
        },
        "default": [],
        "writer": "derived",
        "readOnly": true,
        "description": "Windows {tag, text, color, active, state, first}. The host sets the process condition (active). The states, the first-out mark and the horn are derived through the sequence and the operator actions: by the host when it owns the state (Python: set(), acknowledge(), ...), otherwise by the front end, which writes them back (HOST-004)."
      },
      "columns": {
        "type": "integer",
        "minimum": 1,
        "maximum": 12,
        "default": 4,
        "writer": "host",
        "description": "Windows per row."
      },
      "sequence": {
        "type": "enum",
        "values": [
          "A",
          "M",
          "R"
        ],
        "default": "A",
        "writer": "host",
        "description": "ISA-18.1 sequence: A automatic reset, M manual reset, R ringback. Changing it restarts every window (active: alert, else normal)."
      },
      "first_out": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Mark the first window to alarm until reset (IND-042)."
      },
      "horn": {
        "type": "boolean",
        "default": false,
        "writer": "derived",
        "readOnly": true,
        "description": "True while an alert or ringback is not silenced (no sound is played). Derived."
      },
      "test": {
        "type": "boolean",
        "default": false,
        "writer": "both",
        "description": "Lamp test, while the TEST button is held."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "acknowledge",
        "direction": "front-to-host",
        "description": "ACK button: acknowledge every flashing alert.",
        "fields": {},
        "buffers": []
      },
      {
        "type": "reset",
        "direction": "front-to-host",
        "description": "RESET button: reset cleared windows (M, R) and the first-out mark.",
        "fields": {},
        "buffers": []
      },
      {
        "type": "silence",
        "direction": "front-to-host",
        "description": "SILENCE button: silence the horn until the next alert.",
        "fields": {},
        "buffers": []
      },
      {
        "type": "test",
        "direction": "front-to-host",
        "description": "TEST button held (on) or released.",
        "fields": {
          "on": {
            "type": "boolean"
          }
        },
        "buffers": []
      }
    ]
  },
  "BarGraph": {
    "className": "BarGraph",
    "kind": "bargraph",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "bargraph"
        ],
        "default": "bargraph",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          260,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "any"
        },
        "default": [],
        "writer": "host",
        "description": "One value per bar."
      },
      "bars": {
        "type": "array",
        "items": {
          "type": "any"
        },
        "default": [],
        "writer": "host",
        "description": "Bars: a label, or {label, normal_lo, normal_hi, lolo, lo, hi, hihi}; only label is required, missing limits are null."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the shared scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the shared scale."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host"
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis of the bar alarm levels (ALARM-003)."
      },
      "alarm_levels": {
        "type": "array",
        "items": {
          "type": "enum",
          "values": [
            "normal",
            "lo",
            "lolo",
            "hi",
            "hihi"
          ]
        },
        "default": [],
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of each bar (a bar without a value is normal). Derived: by the host when it owns the state, otherwise by the front end (HOST-004)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "BitField": {
    "className": "BitField",
    "kind": "bitfield",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "bitfield"
        ],
        "default": "bitfield",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          520,
          76
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "integer",
        "minimum": 0,
        "default": 0,
        "writer": "both",
        "description": "The word; bit 0 is the least significant bit. Must be below 2**bits (Python rejects larger values; the front end shows only the bits of the word). Set by the host, or by the user toggling a bit in control mode (IND-112)."
      },
      "bits": {
        "type": "enum",
        "values": [
          8,
          16,
          32
        ],
        "default": 16,
        "writer": "host",
        "description": "Word size."
      },
      "labels": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "description": "Label of each bit, bit 0 first; a bit without a label is shown dimmed."
      },
      "colors": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "description": "CSS on color of each bit, bit 0 first; empty or missing: on_color."
      },
      "on_color": {
        "type": "string",
        "default": "#22c55e",
        "writer": "host",
        "description": "CSS color of a set bit."
      },
      "msb_first": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Draw the most significant bit on the left, as the word is written."
      },
      "show_hex": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Also show the word in hexadecimal."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Boolean": {
    "className": "BooleanWidget",
    "kind": "",
    "abstract": true,
    "traits": {
      "_kind": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "boolean",
        "default": false,
        "writer": "both",
        "description": "State of the control or indicator. Set by the host, or by the user in control mode."
      },
      "default_state": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "State a latch returns to once the host has read it (BOOL-008)."
      },
      "mechanical_action": {
        "type": "enum",
        "values": [
          "switch_when_pressed",
          "switch_when_released",
          "switch_until_released",
          "latch_when_pressed",
          "latch_when_released",
          "latch_until_released"
        ],
        "default": "switch_when_pressed",
        "writer": "host",
        "description": "How the control reacts to the pointer (BOOL-007). With a latch, the host reads the value and restores default_state; without a host that does it, a latched value stays set."
      },
      "latch_timeout": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which an unread latch expires (host side); 0: never."
      },
      "confirm": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Ask for a confirmation before changing the value (BOOL-011)."
      },
      "_pressed": {
        "type": "boolean",
        "default": false,
        "writer": "front",
        "description": "True while the pointer (or Space / Enter) is held on the control."
      },
      "_seq": {
        "type": "integer",
        "default": 0,
        "writer": "front",
        "description": "Sequence number of the last press / release update sent by the front end; a host drops an update whose number is not newer (BOOL-010)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "latch_expired",
        "direction": "host-to-front",
        "description": "An unread latch expired (latch_timeout): the view flashes.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "Compass": {
    "className": "Compass",
    "kind": "compass",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "compass"
        ],
        "default": "compass",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "modulo": 360,
        "default": 0,
        "writer": "both",
        "description": "Heading in degrees, wrapped into [0, 360) (a finite value v is stored as v modulo 360, with a positive result)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 360,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "°",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 8,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.0f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "DeviationIndicator": {
    "className": "DeviationIndicator",
    "kind": "deviation",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "deviation"
        ],
        "default": "deviation",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          220,
          44
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "format": {
        "type": "string",
        "default": "%.2f",
        "writer": "host",
        "description": "printf-like spec of the deviation (NUM-004)."
      },
      "setpoint": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Setpoint; the bar shows value - setpoint."
      },
      "span": {
        "type": "number",
        "exclusiveMinimum": 0,
        "default": 10,
        "writer": "host",
        "description": "Half-range of the bar (must be > 0)."
      },
      "tolerance": {
        "type": "number",
        "minimum": 0,
        "default": 1,
        "writer": "host",
        "description": "Half-width of the tolerance band; outside it the bar takes the alarm color and reads HIGH or LOW."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Unit shown with the deviation."
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": "nan",
        "writer": "host",
        "description": "Measured value."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Dial": {
    "className": "Dial",
    "kind": "dial",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "dial"
        ],
        "default": "dial",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "angle_range": {
        "type": "number",
        "minimum": 10,
        "maximum": 360,
        "default": 300,
        "writer": "host",
        "description": "Angle swept by one turn of the scale, in degrees."
      },
      "turns": {
        "type": "integer",
        "minimum": 1,
        "default": 1,
        "writer": "host",
        "description": "Number of turns for the full scale (multi-turn dial, e.g. a ten-turn potentiometer)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "DigitalWaveformGraph": {
    "className": "DigitalWaveformGraph",
    "kind": "digitalgraph",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "digitalgraph"
        ],
        "default": "digitalgraph",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          480,
          240
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "cursors": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "both",
        "description": "Cursors {x, name, color} (CHART-104). Dragged or typed by the operator, also on indicators; a host may complete a missing name as C<n> (Python does)."
      },
      "cursor_values": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "x": {
              "type": "number"
            },
            "values": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Readout of the cursors for the host program, {name, x, values}, computed by the host from its data. The front end draws its own readout and does not read this trait."
      },
      "annotations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "text": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Text annotations {x, y, text, color} in data coordinates (CHART-105)."
      },
      "export": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Offer CSV, PNG and SVG downloads in the toolbar (CHART-107)."
      },
      "x_unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "value": {
        "type": "object",
        "properties": {
          "n_samples": {
            "type": "integer"
          },
          "n_lines": {
            "type": "integer"
          }
        },
        "default": {},
        "writer": "host",
        "readOnly": true,
        "description": "Size of the data {n_samples, n_lines}, written by the host with each data message."
      },
      "lines": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "description": "Line names; a missing name is shown as D<k>. Python names the lines D0, D1, ... when their number changes."
      },
      "buses": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "lines": {
              "type": "array",
              "minItems": 1,
              "items": {
                "type": "integer",
                "minimum": 0
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Groups of lines {name, lines} shown as one hexadecimal value (first listed line = MSB). Python rejects buses naming a missing line; the front end ignores such lines."
      },
      "dt": {
        "type": "number",
        "default": 1,
        "writer": "host",
        "description": "Sample interval in x-axis units; 0 is shown as 1."
      },
      "x0": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "x-axis position of the first sample."
      },
      "show_lines_in_bus": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Also draw the lines of each bus under it."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "data",
        "direction": "host-to-front",
        "description": "The whole data (this is not a chart: each message replaces the previous data). Sent when the data changes and in reply to sync_request.",
        "fields": {
          "n_samples": {
            "type": "integer",
            "minimum": 0
          },
          "n_lines": {
            "type": "integer",
            "minimum": 0
          },
          "n_analog": {
            "type": "integer",
            "minimum": 0
          },
          "n_traces": {
            "type": "integer",
            "minimum": 0
          }
        },
        "buffers": [
          {
            "dtype": "uint8",
            "shape": [
              "n_samples",
              "n_lines"
            ],
            "order": "C",
            "description": "Logic levels, 0 or 1, one byte per line (not bit-packed)."
          },
          {
            "dtype": "<f4",
            "shape": [
              "n_analog",
              "n_traces"
            ],
            "order": "C",
            "description": "Analog samples of a mixed-signal graph; empty for a digital graph."
          }
        ]
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a data message. A host without data can ignore it.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "EmergencyStop": {
    "className": "EmergencyStop",
    "kind": "emergencystop",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "emergencystop"
        ],
        "default": "emergencystop",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          110,
          110
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "boolean",
        "default": false,
        "writer": "both",
        "description": "True once pressed. The front end only ever writes true; only the host resets it to false (Python: reset()). A Python kernel refuses false from any other source."
      },
      "default_state": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "State a latch returns to once the host has read it (BOOL-008)."
      },
      "mechanical_action": {
        "type": "enum",
        "values": [
          "switch_when_pressed"
        ],
        "default": "switch_when_pressed",
        "writer": "host",
        "description": "Only switch_when_pressed: a press latches the stop."
      },
      "latch_timeout": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which an unread latch expires (host side); 0: never."
      },
      "confirm": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Ask for a confirmation before changing the value (BOOL-011)."
      },
      "_pressed": {
        "type": "boolean",
        "default": false,
        "writer": "front",
        "description": "True while the pointer (or Space / Enter) is held on the control."
      },
      "_seq": {
        "type": "integer",
        "default": 0,
        "writer": "front",
        "description": "Sequence number of the last press / release update sent by the front end; a host drops an update whose number is not newer (BOOL-010)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "latch_expired",
        "direction": "host-to-front",
        "description": "An unread latch expired (latch_timeout): the view flashes.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "EquipmentTree": {
    "className": "EquipmentTree",
    "kind": "equipmenttree",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "equipmenttree"
        ],
        "default": "equipmenttree",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          320,
          280
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "string",
        "default": "",
        "writer": "both",
        "description": "Id of the selected node, empty for none. Set by the host, or by the operator selecting a node in control mode."
      },
      "nodes": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string"
            },
            "id": {
              "type": "string"
            },
            "level": {
              "type": "string"
            },
            "status": {
              "type": "enum",
              "values": [
                "",
                "normal",
                "running",
                "stopped",
                "offline",
                "maintenance",
                "warning",
                "alarm",
                "fault"
              ]
            },
            "children": {
              "type": "array"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Root nodes, each {label, id, level, status, children}. Python rejects a node without a label, an unknown status or a repeated id; without a kernel such a node (and its children) is skipped."
      },
      "expanded": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "both",
        "description": "Ids of the expanded nodes. Set by the host, or by the operator expanding and collapsing nodes."
      },
      "show_level": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Show the level of each node next to its label."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "EventLog": {
    "className": "EventLog",
    "kind": "eventlog",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "eventlog"
        ],
        "default": "eventlog",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          600,
          200
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer"
            },
            "time": {
              "type": "number"
            },
            "source": {
              "type": "string"
            },
            "category": {
              "type": "enum",
              "values": [
                "operator",
                "state",
                "alarm",
                "system"
              ]
            },
            "message": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Events in chronological order, {id, time, source, category, message}. Written by the host (Python: log(), connect()); the view shows at most the newest max_events."
      },
      "max_events": {
        "type": "integer",
        "minimum": 1,
        "default": 500,
        "writer": "host",
        "description": "Number of events kept (the oldest are dropped)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "FillSlide": {
    "className": "FillSlide",
    "kind": "fillslide",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "fillslide"
        ],
        "default": "fillslide",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          260,
          70
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels. The Python class uses (80, 240) when created vertical; other hosts give the size with the orientation."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "fill_color": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "CSS color of the filled part; empty: the theme color. Unsafe colors are ignored (SEC-002)."
      },
      "orientation": {
        "type": "enum",
        "values": [
          "horizontal",
          "vertical"
        ],
        "default": "horizontal",
        "writer": "host",
        "description": "Track direction."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Gauge": {
    "className": "Gauge",
    "kind": "gauge",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "gauge"
        ],
        "default": "gauge",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "peak_hold": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Track and show the highest value (NUM-110)."
      },
      "peak_decay": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which the held peak is released at the next value; 0: held until reset."
      },
      "peak": {
        "nullable": true,
        "type": "number",
        "nonfinite": true,
        "default": null,
        "writer": "derived",
        "readOnly": true,
        "description": "Held peak, null when none. Derived from the history of value (time dependent): by the host when it owns the state, otherwise by the front end (HOST-004)."
      },
      "variant": {
        "type": "enum",
        "values": [
          "circular",
          "semicircular"
        ],
        "default": "circular",
        "writer": "host"
      },
      "ranges": {
        "type": "array",
        "items": {
          "type": "object"
        },
        "default": [],
        "writer": "host",
        "description": "Colored ranges drawn on the scale; unsafe colors are ignored (SEC-002)."
      },
      "setpoint": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Setpoint drawn as a second, dashed pointer with a hollow marker, and stated in the text alternative; null: none (IND-116)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "GraphWidget": {
    "className": "GraphWidget",
    "kind": "",
    "abstract": true,
    "traits": {
      "_kind": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          480,
          240
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "cursors": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "both",
        "description": "Cursors {x, name, color} (CHART-104). Dragged or typed by the operator, also on indicators; a host may complete a missing name as C<n> (Python does)."
      },
      "cursor_values": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "x": {
              "type": "number"
            },
            "values": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Readout of the cursors for the host program, {name, x, values}, computed by the host from its data. The front end draws its own readout and does not read this trait."
      },
      "annotations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "text": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Text annotations {x, y, text, color} in data coordinates (CHART-105)."
      },
      "export": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Offer CSV, PNG and SVG downloads in the toolbar (CHART-107)."
      },
      "x_unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Instrument": {
    "className": "InstrumentWidget",
    "kind": "",
    "abstract": true,
    "traits": {
      "_kind": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "IntensityChart": {
    "className": "IntensityChart",
    "kind": "intensitychart",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "intensitychart"
        ],
        "default": "intensitychart",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          480,
          240
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "cursors": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "both",
        "description": "Cursors {x, name, color} (CHART-104). Dragged or typed by the operator, also on indicators; a host may complete a missing name as C<n> (Python does)."
      },
      "cursor_values": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "x": {
              "type": "number"
            },
            "values": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Readout of the cursors for the host program, {name, x, values}, computed by the host from its data. The front end draws its own readout and does not read this trait."
      },
      "annotations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "text": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Text annotations {x, y, text, color} in data coordinates (CHART-105)."
      },
      "export": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Offer CSV, PNG and SVG downloads in the toolbar (CHART-107)."
      },
      "x_unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "value": {
        "type": "object",
        "properties": {
          "rows": {
            "type": "integer"
          },
          "min": {
            "type": "any"
          },
          "max": {
            "type": "any"
          },
          "argmax": {
            "type": "integer"
          }
        },
        "default": {},
        "writer": "host",
        "readOnly": true,
        "description": "Summary of the latest row {rows, min, max, argmax}, written by the host with each append."
      },
      "history": {
        "type": "integer",
        "minimum": 2,
        "default": 200,
        "writer": "host",
        "description": "Rows kept and shown."
      },
      "n_bins": {
        "type": "integer",
        "minimum": 1,
        "default": 64,
        "writer": "host",
        "description": "Values per row."
      },
      "dt": {
        "type": "number",
        "default": 1,
        "writer": "host",
        "description": "Time step between rows in x-axis units; 0 is shown as 1."
      },
      "y_min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Value of the lower edge of the first bin."
      },
      "y_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Value of the upper edge of the last bin; null: y_min + n_bins."
      },
      "z_min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Color range when autoscale_z is off."
      },
      "z_max": {
        "type": "number",
        "default": 1,
        "writer": "host"
      },
      "autoscale_z": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "colormap": {
        "type": "enum",
        "values": [
          "viridis",
          "inferno",
          "magma",
          "plasma",
          "gray",
          "jet"
        ],
        "default": "viridis",
        "writer": "host"
      },
      "show_colorbar": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "append",
        "direction": "host-to-front",
        "description": "New rows. total counts every row appended since the last clear; when more than history rows were appended, only the last history are sent.",
        "fields": {
          "n_rows": {
            "type": "integer",
            "minimum": 0
          },
          "total": {
            "type": "integer",
            "minimum": 0
          }
        },
        "buffers": [
          {
            "dtype": "<f4",
            "shape": [
              "n_rows",
              "n_bins"
            ],
            "order": "C",
            "description": "Rows, oldest first, one per time step, n_bins values each."
          }
        ]
      },
      {
        "type": "snapshot",
        "direction": "host-to-front",
        "description": "Kept rows (at most history), in reply to sync_request and when history or n_bins changes.",
        "fields": {
          "n_rows": {
            "type": "integer",
            "minimum": 0
          },
          "total": {
            "type": "integer",
            "minimum": 0
          }
        },
        "buffers": [
          {
            "dtype": "<f4",
            "shape": [
              "n_rows",
              "n_bins"
            ],
            "order": "C",
            "description": "Rows, oldest first, one per time step, n_bins values each."
          }
        ]
      },
      {
        "type": "clear",
        "direction": "host-to-front",
        "description": "Empty the history.",
        "fields": {},
        "buffers": []
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a snapshot. A host without history can ignore it.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "Knob": {
    "className": "Knob",
    "kind": "knob",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "knob"
        ],
        "default": "knob",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "angle_range": {
        "type": "number",
        "minimum": 10,
        "maximum": 360,
        "default": 270,
        "writer": "host",
        "description": "Angle swept by the scale, in degrees."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "KPITile": {
    "className": "KPITile",
    "kind": "kpitile",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "kpitile"
        ],
        "default": "kpitile",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          190,
          96
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": "nan",
        "writer": "host",
        "description": "Current value of the indicator."
      },
      "target": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Target; null: no difference shown."
      },
      "higher_is_better": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Which side of the target is good (shown with ✓ / ✗)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host"
      },
      "show_sparkline": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Draw the history as a sparkline."
      },
      "history": {
        "type": "integer",
        "minimum": 2,
        "default": 30,
        "writer": "host",
        "description": "Number of values kept for the sparkline."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "snapshot",
        "direction": "host-to-front",
        "description": "Whole kept history of the tile, oldest first; replaces the view's history. Sent in reply to sync_request and when history changes.",
        "fields": {
          "n": {
            "type": "integer",
            "description": "Number of values in the buffer."
          }
        },
        "buffers": [
          {
            "dtype": "<f4",
            "shape": [
              "n"
            ],
            "description": "Values, oldest first."
          }
        ]
      },
      {
        "type": "append",
        "direction": "host-to-front",
        "description": "New values appended to the history (the last one is the newest).",
        "fields": {
          "n": {
            "type": "integer"
          }
        },
        "buffers": [
          {
            "dtype": "<f4",
            "shape": [
              "n"
            ],
            "description": "Values, oldest first."
          }
        ]
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a snapshot. A host without history can ignore it.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "LED": {
    "className": "LED",
    "kind": "led",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "led"
        ],
        "default": "led",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          48,
          48
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "boolean",
        "default": false,
        "writer": "both",
        "description": "State of the control or indicator. Set by the host, or by the user in control mode."
      },
      "default_state": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "State a latch returns to once the host has read it (BOOL-008)."
      },
      "mechanical_action": {
        "type": "enum",
        "values": [
          "switch_when_pressed",
          "switch_when_released",
          "switch_until_released",
          "latch_when_pressed",
          "latch_when_released",
          "latch_until_released"
        ],
        "default": "switch_when_pressed",
        "writer": "host",
        "description": "How the control reacts to the pointer (BOOL-007). With a latch, the host reads the value and restores default_state; without a host that does it, a latched value stays set."
      },
      "latch_timeout": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which an unread latch expires (host side); 0: never."
      },
      "confirm": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Ask for a confirmation before changing the value (BOOL-011)."
      },
      "_pressed": {
        "type": "boolean",
        "default": false,
        "writer": "front",
        "description": "True while the pointer (or Space / Enter) is held on the control."
      },
      "_seq": {
        "type": "integer",
        "default": 0,
        "writer": "front",
        "description": "Sequence number of the last press / release update sent by the front end; a host drops an update whose number is not newer (BOOL-010)."
      },
      "blink": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Blink while on (steady outline when reduced motion is requested, A11Y-005)."
      },
      "blink_hz": {
        "type": "number",
        "minimum": 0.1,
        "maximum": 10,
        "default": 2,
        "writer": "host",
        "description": "Blink frequency in Hz."
      },
      "off_color": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "CSS color when off; empty: a dark version of on_color."
      },
      "on_color": {
        "type": "string",
        "default": "#22c55e",
        "writer": "host",
        "description": "CSS color when lit; unsafe colors are ignored (SEC-002)."
      },
      "shape": {
        "type": "enum",
        "values": [
          "round",
          "square"
        ],
        "default": "round",
        "writer": "host",
        "description": "LED shape (the state is also given by text for assistive technologies, A11Y-003)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "latch_expired",
        "direction": "host-to-front",
        "description": "An unread latch expired (latch_timeout): the view flashes.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "Meter": {
    "className": "Meter",
    "kind": "meter",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "meter"
        ],
        "default": "meter",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          200,
          140
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "peak_hold": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Track and show the highest value (NUM-110)."
      },
      "peak_decay": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which the held peak is released at the next value; 0: held until reset."
      },
      "peak": {
        "nullable": true,
        "type": "number",
        "nonfinite": true,
        "default": null,
        "writer": "derived",
        "readOnly": true,
        "description": "Held peak, null when none. Derived from the history of value (time dependent): by the host when it owns the state, otherwise by the front end (HOST-004)."
      },
      "angle_range": {
        "type": "number",
        "minimum": 20,
        "maximum": 150,
        "default": 90,
        "writer": "host",
        "description": "Angle swept by the scale, in degrees."
      },
      "setpoint": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Setpoint drawn as a second, dashed pointer with a hollow marker, and stated in the text alternative; null: none (IND-116)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "MixedSignalGraph": {
    "className": "MixedSignalGraph",
    "kind": "mixedgraph",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "mixedgraph"
        ],
        "default": "mixedgraph",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          520,
          320
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "cursors": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "both",
        "description": "Cursors {x, name, color} (CHART-104). Dragged or typed by the operator, also on indicators; a host may complete a missing name as C<n> (Python does)."
      },
      "cursor_values": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "x": {
              "type": "number"
            },
            "values": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Readout of the cursors for the host program, {name, x, values}, computed by the host from its data. The front end draws its own readout and does not read this trait."
      },
      "annotations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "text": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Text annotations {x, y, text, color} in data coordinates (CHART-105)."
      },
      "export": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Offer CSV, PNG and SVG downloads in the toolbar (CHART-107)."
      },
      "x_unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "value": {
        "type": "object",
        "properties": {
          "n_samples": {
            "type": "integer"
          },
          "n_lines": {
            "type": "integer"
          }
        },
        "default": {},
        "writer": "host",
        "readOnly": true,
        "description": "Size of the data {n_samples, n_lines}, written by the host with each data message."
      },
      "lines": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "description": "Line names; a missing name is shown as D<k>. Python names the lines D0, D1, ... when their number changes."
      },
      "buses": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "lines": {
              "type": "array",
              "minItems": 1,
              "items": {
                "type": "integer",
                "minimum": 0
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Groups of lines {name, lines} shown as one hexadecimal value (first listed line = MSB). Python rejects buses naming a missing line; the front end ignores such lines."
      },
      "dt": {
        "type": "number",
        "default": 1,
        "writer": "host",
        "description": "Sample interval in x-axis units; 0 is shown as 1."
      },
      "x0": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "x-axis position of the first sample."
      },
      "show_lines_in_bus": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Also draw the lines of each bus under it."
      },
      "traces": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "width": {
              "type": "number"
            },
            "visible": {
              "type": "boolean"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Optional style of each analog trace {name, color, width, visible}."
      },
      "y_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Analog y range; null (either limit): scaled to the data."
      },
      "y_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "analog_fraction": {
        "type": "number",
        "minimum": 0.1,
        "maximum": 0.9,
        "default": 0.55,
        "writer": "host",
        "description": "Share of the height given to the analog traces."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "data",
        "direction": "host-to-front",
        "description": "The whole data (this is not a chart: each message replaces the previous data). Sent when the data changes and in reply to sync_request.",
        "fields": {
          "n_samples": {
            "type": "integer",
            "minimum": 0
          },
          "n_lines": {
            "type": "integer",
            "minimum": 0
          },
          "n_analog": {
            "type": "integer",
            "minimum": 0
          },
          "n_traces": {
            "type": "integer",
            "minimum": 0
          }
        },
        "buffers": [
          {
            "dtype": "uint8",
            "shape": [
              "n_samples",
              "n_lines"
            ],
            "order": "C",
            "description": "Logic levels, 0 or 1, one byte per line (not bit-packed)."
          },
          {
            "dtype": "<f4",
            "shape": [
              "n_analog",
              "n_traces"
            ],
            "order": "C",
            "description": "Analog samples of a mixed-signal graph; empty for a digital graph."
          }
        ]
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a data message. A host without data can ignore it.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "Motor": {
    "className": "Motor",
    "kind": "motor",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "motor"
        ],
        "default": "motor",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          90,
          90
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "tag": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Instrument tag shown on the faceplate (e.g. P-101)."
      },
      "auto": {
        "type": "boolean",
        "default": true,
        "writer": "both",
        "description": "Automatic mode: the commands are disabled on the faceplate. The faceplate AUTO / MANUAL buttons send auto and manual commands; without a host owning the state, the front end applies them itself (HOST-012)."
      },
      "simulate": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "A command sets the state itself (teaching, simulations): see the x-awi-simulated table of commands. Applied by the host when it owns the state, otherwise by the front end."
      },
      "commands": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [
          "forward",
          "reverse",
          "stop"
        ],
        "writer": "host",
        "readOnly": true,
        "simulated": {
          "forward": "forward",
          "reverse": "reverse",
          "stop": "stopped"
        },
        "description": "Commands offered on the faceplate (a constant of each widget)."
      },
      "value": {
        "type": "enum",
        "values": [
          "stopped",
          "forward",
          "reverse",
          "fault"
        ],
        "default": "stopped",
        "writer": "host",
        "description": "Motor state (feedback from the process)."
      },
      "animate": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Animate while turning (off when reduced motion is requested)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "command",
        "direction": "front-to-host",
        "description": "Operator command from the faceplate: one of commands, or auto / manual. Also sent when the front end applies it itself.",
        "fields": {
          "command": {
            "type": "string"
          }
        },
        "buffers": []
      }
    ]
  },
  "Numeric": {
    "className": "NumericWidget",
    "kind": "",
    "abstract": true,
    "traits": {
      "_kind": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "NumericEntry": {
    "className": "NumericEntry",
    "kind": "numericentry",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "numericentry"
        ],
        "default": "numericentry",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          180,
          230
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.2f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "confirm_delta": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A change larger than this asks for a second Enter (confirmation); null: no confirmation (IND-104)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "PeakHold": {
    "className": "_PeakMixin",
    "kind": "",
    "abstract": true,
    "traits": {
      "_kind": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          160
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "peak_hold": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Track and show the highest value (NUM-110)."
      },
      "peak_decay": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which the held peak is released at the next value; 0: held until reset."
      },
      "peak": {
        "nullable": true,
        "type": "number",
        "nonfinite": true,
        "default": null,
        "writer": "derived",
        "readOnly": true,
        "description": "Held peak, null when none. Derived from the history of value (time dependent): by the host when it owns the state, otherwise by the front end (HOST-004)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "PictureControl": {
    "className": "PictureControl",
    "kind": "picture",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "picture"
        ],
        "default": "picture",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          320,
          200
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "object",
        "properties": {
          "x": {
            "type": "number"
          },
          "y": {
            "type": "number"
          },
          "button": {
            "type": "integer"
          }
        },
        "default": {},
        "writer": "derived",
        "readOnly": true,
        "description": "Last click {x, y, button} in CSS pixels from the top-left corner (SPEC-006), control mode only. Written by the host when it owns the state; without one, the front end writes it back (HOST-012). The click is always sent as a click message."
      },
      "background": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "CSS color of the background; empty: transparent."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "draw",
        "direction": "host-to-front",
        "description": "Drawing commands, rendered in one frame once their images are decoded (SPEC-007). With clear, the display list is emptied first. Sent for each batch of commands and, with clear and the whole display list, in reply to sync_request.",
        "fields": {
          "clear": {
            "type": "boolean"
          },
          "commands": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "op"
              ],
              "properties": {
                "op": {
                  "enum": [
                    "line",
                    "rect",
                    "arc",
                    "polygon",
                    "text",
                    "image"
                  ]
                },
                "x0": {
                  "type": "number"
                },
                "y0": {
                  "type": "number"
                },
                "x1": {
                  "type": "number"
                },
                "y1": {
                  "type": "number"
                },
                "x": {
                  "type": "number"
                },
                "y": {
                  "type": "number"
                },
                "w": {
                  "type": [
                    "number",
                    "null"
                  ]
                },
                "h": {
                  "type": [
                    "number",
                    "null"
                  ]
                },
                "cx": {
                  "type": "number"
                },
                "cy": {
                  "type": "number"
                },
                "r": {
                  "type": "number"
                },
                "start": {
                  "type": "number",
                  "description": "Arc start, degrees clockwise from 3 o'clock."
                },
                "end": {
                  "type": "number",
                  "description": "Arc end; |end - start| >= 360: full circle."
                },
                "points": {
                  "type": "array",
                  "items": {
                    "type": "array",
                    "prefixItems": [
                      {
                        "type": "number"
                      },
                      {
                        "type": "number"
                      }
                    ],
                    "minItems": 2,
                    "maxItems": 2
                  }
                },
                "closed": {
                  "type": "boolean"
                },
                "stroke": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "description": 'CSS color or "currentColor" (the foreground color); null or empty: none.'
                },
                "fill": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "description": 'CSS color or "currentColor" (the foreground color); null or empty: none.'
                },
                "width": {
                  "type": "number",
                  "description": "Line width in CSS pixels."
                },
                "text": {
                  "type": "string",
                  "description": "Plain text, drawn as canvas text (never HTML)."
                },
                "size": {
                  "type": "number",
                  "description": "Font size in CSS pixels."
                },
                "anchor": {
                  "enum": [
                    "start",
                    "middle",
                    "end"
                  ]
                },
                "mime": {
                  "enum": [
                    "image/png",
                    "image/jpeg",
                    "rgba"
                  ]
                },
                "pw": {
                  "type": "integer",
                  "description": "Width in pixels of an rgba image."
                },
                "ph": {
                  "type": "integer",
                  "description": "Height in pixels of an rgba image."
                },
                "buffer": {
                  "type": "integer",
                  "description": "Index, in the buffers of this message, of the image bytes."
                }
              }
            }
          }
        },
        "buffers": [
          {
            "dtype": "uint8",
            "shape": [
              "nbytes"
            ],
            "description": "One buffer per image command, at the index given by its buffer field: PNG or JPEG file bytes (mime image/png, image/jpeg) or pixels (mime rgba, row-major (ph, pw, 4))."
          }
        ]
      },
      {
        "type": "click",
        "direction": "front-to-host",
        "description": "Click in control mode (SPEC-006).",
        "fields": {
          "x": {
            "type": "number"
          },
          "y": {
            "type": "number"
          },
          "button": {
            "type": "integer"
          }
        },
        "buffers": []
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a draw message holding the whole display list (clear true). A host without a display list can ignore it.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "PIDFaceplate": {
    "className": "PIDFaceplate",
    "kind": "pidfaceplate",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "pidfaceplate"
        ],
        "default": "pidfaceplate",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          240,
          236
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "tag": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Loop tag, e.g. TIC-101."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Unit of PV and SP."
      },
      "op_unit": {
        "type": "string",
        "default": "%",
        "writer": "host",
        "description": "Unit of OP."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec of the values (NUM-004)."
      },
      "pv": {
        "type": "number",
        "nonfinite": true,
        "default": "nan",
        "writer": "host",
        "description": "Process value (measurement), set by the host."
      },
      "sp": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Setpoint, clamped to sp_min .. sp_max (or the PV range). Changed by the operator in AUTO (IND-031)."
      },
      "op": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Output, clamped to op_min .. op_max. Changed by the operator in MAN."
      },
      "loop_mode": {
        "type": "enum",
        "values": [
          "MAN",
          "AUTO",
          "CAS"
        ],
        "default": "AUTO",
        "writer": "host",
        "description": "Loop mode: MAN (operator sets OP), AUTO (operator sets SP), CAS (neither). Must be one of modes."
      },
      "modes": {
        "type": "array",
        "items": {
          "type": "enum",
          "values": [
            "MAN",
            "AUTO",
            "CAS"
          ]
        },
        "default": [
          "MAN",
          "AUTO"
        ],
        "writer": "host",
        "description": "Modes offered on the faceplate."
      },
      "pv_min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the PV scale."
      },
      "pv_max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the PV scale."
      },
      "sp_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Lower setpoint limit; null: pv_min."
      },
      "sp_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Upper setpoint limit; null: pv_max."
      },
      "op_min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower output limit."
      },
      "op_max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper output limit."
      },
      "confirm_delta": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A change of SP or OP larger than this needs a confirmation (IND-032); null: never."
      },
      "sp_tracking": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Leaving MAN sets SP to PV (bumpless transfer, IND-034)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit on PV."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit on PV."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit on PV."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit on PV."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Alarm hysteresis (ALARM-003)."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "source": "pv",
        "description": "Alarm level of pv. Derived: by the host when it owns the state, otherwise by the front end (HOST-004)."
      },
      "value": {
        "type": "object",
        "properties": {
          "pv": {
            "type": "any"
          },
          "sp": {
            "type": "number"
          },
          "op": {
            "type": "number"
          },
          "mode": {
            "type": "string"
          }
        },
        "default": {},
        "writer": "derived",
        "readOnly": true,
        "resolved": true,
        "description": "Summary {pv, sp, op, mode}. Derived: by the host when it owns the state, otherwise by the front end."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "set",
        "direction": "front-to-host",
        "description": "Operator entry of SP or OP; also sent when the front end applies it itself.",
        "fields": {
          "field": {
            "enum": [
              "sp",
              "op"
            ]
          },
          "value": {
            "type": "number"
          },
          "confirmed": {
            "type": "boolean"
          }
        },
        "buffers": []
      },
      {
        "type": "loop_mode",
        "direction": "front-to-host",
        "description": "Operator mode change.",
        "fields": {
          "mode": {
            "type": "string"
          }
        },
        "buffers": []
      },
      {
        "type": "rejected",
        "direction": "host-to-front",
        "description": "An operator entry refused by the rules.",
        "fields": {
          "field": {
            "type": "string"
          },
          "reason": {
            "type": "string"
          }
        },
        "buffers": []
      }
    ]
  },
  "Pipe": {
    "className": "Pipe",
    "kind": "pipe",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "pipe"
        ],
        "default": "pipe",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          80,
          80
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "flow_animation": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Animate a moving pattern while flowing (off when reduced motion is requested)."
      },
      "flow_direction": {
        "type": "enum",
        "values": [
          "forward",
          "reverse"
        ],
        "default": "forward",
        "writer": "host",
        "description": "Direction of the moving pattern."
      },
      "fluid_color": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "CSS color of the fluid; unsafe colors are ignored (SEC-002)."
      },
      "rotation": {
        "type": "enum",
        "values": [
          0,
          90,
          180,
          270
        ],
        "default": 0,
        "writer": "host",
        "description": "Rotation in degrees."
      },
      "shape": {
        "type": "enum",
        "values": [
          "straight",
          "elbow",
          "tee",
          "cross"
        ],
        "default": "straight",
        "writer": "host",
        "description": "Unrotated: straight left to right, elbow left to bottom, tee left to right with a branch to the bottom, cross all four sides."
      },
      "thickness": {
        "type": "number",
        "minimum": 2,
        "default": 14,
        "writer": "host",
        "description": "Pipe thickness in pixels."
      },
      "value": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "True while the fluid flows."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "PolarPlot": {
    "className": "PolarPlot",
    "kind": "polar",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "polar"
        ],
        "default": "polar",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          260,
          260
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "style": {
              "type": "enum",
              "values": [
                "line",
                "markers",
                "both"
              ]
            },
            "r": {
              "type": "array",
              "items": {
                "type": "any"
              }
            },
            "theta": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Data sets {name, color, style, r, theta}; r and theta have the same length."
      },
      "show_legend": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "angle_unit": {
        "type": "enum",
        "values": [
          "deg",
          "rad"
        ],
        "default": "deg",
        "writer": "host"
      },
      "zero": {
        "type": "enum",
        "values": [
          "E",
          "N"
        ],
        "default": "E",
        "writer": "host",
        "description": "Where angle 0 is: east (mathematical) or north (compass)."
      },
      "direction": {
        "type": "enum",
        "values": [
          "ccw",
          "cw"
        ],
        "default": "ccw",
        "writer": "host",
        "description": "Positive sense of the angles."
      },
      "r_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "both",
        "description": "Radial range; null or not positive: scaled to the data. Set by the operator with the mouse wheel or the r max field (CHART-108)."
      },
      "rings": {
        "type": "integer",
        "minimum": 1,
        "default": 4,
        "writer": "host",
        "description": "Approximate number of grid rings."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Process": {
    "className": "ProcessObject",
    "kind": "",
    "abstract": true,
    "traits": {
      "_kind": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          90,
          90
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "tag": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Instrument tag shown on the faceplate (e.g. P-101)."
      },
      "auto": {
        "type": "boolean",
        "default": true,
        "writer": "both",
        "description": "Automatic mode: the commands are disabled on the faceplate. The faceplate AUTO / MANUAL buttons send auto and manual commands; without a host owning the state, the front end applies them itself (HOST-012)."
      },
      "simulate": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "A command sets the state itself (teaching, simulations): see the x-awi-simulated table of commands. Applied by the host when it owns the state, otherwise by the front end."
      },
      "commands": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Commands offered on the faceplate (a constant of each widget)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "command",
        "direction": "front-to-host",
        "description": "Operator command from the faceplate: one of commands, or auto / manual. Also sent when the front end applies it itself.",
        "fields": {
          "command": {
            "type": "string"
          }
        },
        "buffers": []
      }
    ]
  },
  "Pump": {
    "className": "Pump",
    "kind": "pump",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "pump"
        ],
        "default": "pump",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          90,
          90
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "tag": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Instrument tag shown on the faceplate (e.g. P-101)."
      },
      "auto": {
        "type": "boolean",
        "default": true,
        "writer": "both",
        "description": "Automatic mode: the commands are disabled on the faceplate. The faceplate AUTO / MANUAL buttons send auto and manual commands; without a host owning the state, the front end applies them itself (HOST-012)."
      },
      "simulate": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "A command sets the state itself (teaching, simulations): see the x-awi-simulated table of commands. Applied by the host when it owns the state, otherwise by the front end."
      },
      "commands": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [
          "start",
          "stop"
        ],
        "writer": "host",
        "readOnly": true,
        "simulated": {
          "start": "running",
          "stop": "stopped"
        },
        "description": "Commands offered on the faceplate (a constant of each widget)."
      },
      "value": {
        "type": "enum",
        "values": [
          "stopped",
          "running",
          "fault"
        ],
        "default": "stopped",
        "writer": "host",
        "description": "Pump state (feedback from the process)."
      },
      "animate": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Rotate while running (off when reduced motion is requested)."
      },
      "direction": {
        "type": "enum",
        "values": [
          "right",
          "left",
          "up",
          "down"
        ],
        "default": "right",
        "writer": "host",
        "description": "Discharge direction of the symbol."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "command",
        "direction": "front-to-host",
        "description": "Operator command from the faceplate: one of commands, or auto / manual. Also sent when the front end applies it itself.",
        "fields": {
          "command": {
            "type": "string"
          }
        },
        "buffers": []
      }
    ]
  },
  "PushButton": {
    "className": "PushButton",
    "kind": "pushbutton",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "pushbutton"
        ],
        "default": "pushbutton",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          110,
          44
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "boolean",
        "default": false,
        "writer": "both",
        "description": "State of the control or indicator. Set by the host, or by the user in control mode."
      },
      "default_state": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "State a latch returns to once the host has read it (BOOL-008)."
      },
      "mechanical_action": {
        "type": "enum",
        "values": [
          "switch_when_pressed",
          "switch_when_released",
          "switch_until_released",
          "latch_when_pressed",
          "latch_when_released",
          "latch_until_released"
        ],
        "default": "latch_when_released",
        "writer": "host",
        "description": "How the control reacts to the pointer (BOOL-007). With a latch, the host reads the value and restores default_state; without a host that does it, a latched value stays set."
      },
      "latch_timeout": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which an unread latch expires (host side); 0: never."
      },
      "confirm": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Ask for a confirmation before changing the value (BOOL-011)."
      },
      "_pressed": {
        "type": "boolean",
        "default": false,
        "writer": "front",
        "description": "True while the pointer (or Space / Enter) is held on the control."
      },
      "_seq": {
        "type": "integer",
        "default": 0,
        "writer": "front",
        "description": "Sequence number of the last press / release update sent by the front end; a host drops an update whose number is not newer (BOOL-010)."
      },
      "color": {
        "type": "enum",
        "values": [
          "grey",
          "green",
          "red",
          "black",
          "yellow",
          "blue",
          "white"
        ],
        "default": "grey",
        "writer": "host",
        "description": "Cap color (IEC 60073: green to start, red to stop...)."
      },
      "lamp": {
        "nullable": true,
        "type": "boolean",
        "default": null,
        "writer": "host",
        "description": "Built-in lamp: true lit, false unlit, null no lamp (BOOL-015). Feedback set by the host, independent of value."
      },
      "lamp_blink": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Flash the lamp."
      },
      "lamp_color": {
        "type": "enum",
        "values": [
          "green",
          "red",
          "amber",
          "blue",
          "white"
        ],
        "default": "green",
        "writer": "host",
        "description": "Lamp color."
      },
      "shape": {
        "type": "enum",
        "values": [
          "rect",
          "round"
        ],
        "default": "rect",
        "writer": "host",
        "description": "rect (panel button) or round (operator); the Python class uses a 90 x 90 size for round."
      },
      "text": {
        "type": "string",
        "default": "OK",
        "writer": "host",
        "description": "Caption (plain text, SEC-002)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "latch_expired",
        "direction": "host-to-front",
        "description": "An unread latch expired (latch_timeout): the view flashes.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "RadarChart": {
    "className": "RadarChart",
    "kind": "radar",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "radar"
        ],
        "default": "radar",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          260,
          260
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "values": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Data sets {name, color, values}."
      },
      "show_legend": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "axes": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "description": "Axis names; empty: axes numbered from the longest data set."
      },
      "ranges": {
        "type": "array",
        "items": {
          "type": "array",
          "minItems": 2,
          "maxItems": 2,
          "prefixItems": [
            {
              "type": "number"
            },
            {
              "type": "number"
            }
          ]
        },
        "default": [],
        "writer": "host",
        "description": "[min, max] per axis, max > min; an axis without a valid range goes from 0 to the largest value of the data sets."
      },
      "fill": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Fill the data set polygons."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "RecipeTable": {
    "className": "RecipeTable",
    "kind": "recipetable",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "recipetable"
        ],
        "default": "recipetable",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          560,
          220
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "columns": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "type": {
              "type": "enum",
              "values": [
                "number",
                "choice",
                "bool",
                "text"
              ]
            },
            "unit": {
              "type": "string"
            },
            "min": {
              "nullable": true,
              "type": "number"
            },
            "max": {
              "nullable": true,
              "type": "number"
            },
            "step": {
              "type": "number",
              "minimum": 0
            },
            "format": {
              "type": "string"
            },
            "choices": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "readonly": {
              "type": "boolean"
            },
            "default": {
              "type": "any"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Columns {name, title, type, unit, min, max, step, format, choices, readonly, default}. Python normalizes them (a string is a number column of that name, missing keys get their defaults) and rejects duplicate names, unknown keys, max < min and choice columns without choices."
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object"
        },
        "default": [],
        "writer": "both",
        "description": "Rows, each a dict keyed by column name, every cell valid for its column. Written by the host (Python checks every row); operator edits arrive as messages and are applied by the host, or by the front end when no host owns the state (HOST-012)."
      },
      "row_edit": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Let the operator add and delete rows (IND-114)."
      },
      "max_rows": {
        "type": "integer",
        "minimum": 1,
        "default": 100,
        "writer": "host",
        "description": "Most rows the table may hold."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "edit",
        "direction": "front-to-host",
        "description": "The operator confirmed a cell (control mode). The front end has checked it against its column; the host checks it again, applies it or answers rejected.",
        "fields": {
          "row": {
            "type": "integer",
            "minimum": 0
          },
          "column": {
            "type": "string"
          },
          "value": {
            "type": [
              "number",
              "string",
              "boolean"
            ]
          }
        },
        "buffers": []
      },
      {
        "type": "add",
        "direction": "front-to-host",
        "description": "The operator added a row (row_edit): the host appends a row of column defaults.",
        "fields": {},
        "buffers": []
      },
      {
        "type": "delete",
        "direction": "front-to-host",
        "description": "The operator deleted a row (row_edit).",
        "fields": {
          "row": {
            "type": "integer",
            "minimum": 0
          }
        },
        "buffers": []
      },
      {
        "type": "rejected",
        "direction": "host-to-front",
        "description": "An edit the host did not apply, with the reason shown to the operator.",
        "fields": {
          "row": {
            "type": [
              "integer",
              "null"
            ]
          },
          "column": {
            "type": [
              "string",
              "null"
            ]
          },
          "reason": {
            "type": "string"
          }
        },
        "buffers": []
      }
    ]
  },
  "RockerSwitch": {
    "className": "RockerSwitch",
    "kind": "rockerswitch",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "rockerswitch"
        ],
        "default": "rockerswitch",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          60,
          100
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "boolean",
        "default": false,
        "writer": "both",
        "description": "State of the control or indicator. Set by the host, or by the user in control mode."
      },
      "default_state": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "State a latch returns to once the host has read it (BOOL-008)."
      },
      "mechanical_action": {
        "type": "enum",
        "values": [
          "switch_when_pressed",
          "switch_when_released",
          "switch_until_released",
          "latch_when_pressed",
          "latch_when_released",
          "latch_until_released"
        ],
        "default": "switch_when_pressed",
        "writer": "host",
        "description": "How the control reacts to the pointer (BOOL-007). With a latch, the host reads the value and restores default_state; without a host that does it, a latched value stays set."
      },
      "latch_timeout": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which an unread latch expires (host side); 0: never."
      },
      "confirm": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Ask for a confirmation before changing the value (BOOL-011)."
      },
      "_pressed": {
        "type": "boolean",
        "default": false,
        "writer": "front",
        "description": "True while the pointer (or Space / Enter) is held on the control."
      },
      "_seq": {
        "type": "integer",
        "default": 0,
        "writer": "front",
        "description": "Sequence number of the last press / release update sent by the front end; a host drops an update whose number is not newer (BOOL-010)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "latch_expired",
        "direction": "host-to-front",
        "description": "An unread latch expired (latch_timeout): the view flashes.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "SelectorSwitch": {
    "className": "SelectorSwitch",
    "kind": "selectorswitch",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "selectorswitch"
        ],
        "default": "selectorswitch",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          140,
          130
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "string",
        "default": "",
        "writer": "both",
        "resolved": true,
        "description": "Label of the selected position. Empty, or not one of positions: default_position, else the middle position (the Python class resolves it when the widget is created)."
      },
      "positions": {
        "type": "array",
        "minItems": 2,
        "maxItems": 5,
        "uniqueItems": true,
        "items": {
          "type": "string"
        },
        "default": [
          "HAND",
          "OFF",
          "AUTO"
        ],
        "writer": "host",
        "description": "2 to 5 distinct position labels, left to right."
      },
      "keyed": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Key switch: with locked, the front end cannot move it (IND-012)."
      },
      "locked": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Key removed: the position is locked for the operator (the host can still set it)."
      },
      "default_position": {
        "nullable": true,
        "type": "string",
        "default": null,
        "writer": "host",
        "description": "Position the switch returns to from a spring-return position; also the resolved value. Ignored when not one of positions."
      },
      "spring_return": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "description": "Positions that go back to default_position when the operator releases the switch (IND-013)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "SeriesWidget": {
    "className": "_SeriesWidget",
    "kind": "",
    "abstract": true,
    "traits": {
      "_kind": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          260,
          260
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object"
        },
        "default": [],
        "writer": "host",
        "description": "Data sets, drawn in order; the fields depend on the widget. A data set with the name of an existing one replaces it (Python: plot(..., replace=True))."
      },
      "show_legend": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "SevenSegment": {
    "className": "SevenSegment",
    "kind": "sevensegment",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "sevensegment"
        ],
        "default": "sevensegment",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          200,
          80
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": -1e9,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 1e9,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "color": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "CSS color of the lit segments; empty: the theme color. Unsafe colors are ignored (SEC-002)."
      },
      "decimals": {
        "type": "integer",
        "minimum": 0,
        "default": 1,
        "writer": "host",
        "description": "Digits after the decimal point."
      },
      "digits": {
        "type": "integer",
        "minimum": 1,
        "maximum": 16,
        "default": 4,
        "writer": "host",
        "description": "Number of digit positions."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "SlideSwitch": {
    "className": "SlideSwitch",
    "kind": "slideswitch",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "slideswitch"
        ],
        "default": "slideswitch",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          90,
          44
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "boolean",
        "default": false,
        "writer": "both",
        "description": "State of the control or indicator. Set by the host, or by the user in control mode."
      },
      "default_state": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "State a latch returns to once the host has read it (BOOL-008)."
      },
      "mechanical_action": {
        "type": "enum",
        "values": [
          "switch_when_pressed",
          "switch_when_released",
          "switch_until_released",
          "latch_when_pressed",
          "latch_when_released",
          "latch_until_released"
        ],
        "default": "switch_when_pressed",
        "writer": "host",
        "description": "How the control reacts to the pointer (BOOL-007). With a latch, the host reads the value and restores default_state; without a host that does it, a latched value stays set."
      },
      "latch_timeout": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which an unread latch expires (host side); 0: never."
      },
      "confirm": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Ask for a confirmation before changing the value (BOOL-011)."
      },
      "_pressed": {
        "type": "boolean",
        "default": false,
        "writer": "front",
        "description": "True while the pointer (or Space / Enter) is held on the control."
      },
      "_seq": {
        "type": "integer",
        "default": 0,
        "writer": "front",
        "description": "Sequence number of the last press / release update sent by the front end; a host drops an update whose number is not newer (BOOL-010)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "latch_expired",
        "direction": "host-to-front",
        "description": "An unread latch expired (latch_timeout): the view flashes.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "SmithChart": {
    "className": "SmithChart",
    "kind": "smith",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "smith"
        ],
        "default": "smith",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          260,
          260
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "style": {
              "type": "enum",
              "values": [
                "line",
                "markers",
                "both"
              ]
            },
            "re": {
              "type": "array",
              "items": {
                "type": "any"
              }
            },
            "im": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": 'Data sets {name, color, style, re, im} of reflection coefficients Γ = (Z - z0) / (Z + z0); a host plotting impedances converts them (Python: plot(z, kind="impedance")).'
      },
      "show_legend": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "z0": {
        "type": "number",
        "minimum": 0,
        "exclusiveMinimum": 0,
        "default": 50,
        "writer": "host",
        "description": "Reference impedance in ohms, used to show impedances in the tooltips (must be > 0)."
      },
      "show_admittance": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Also draw the constant-conductance circles."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Sparkline": {
    "className": "Sparkline",
    "kind": "sparkline",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "sparkline"
        ],
        "default": "sparkline",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          160,
          36
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": "nan",
        "writer": "host",
        "readOnly": true,
        "description": "Last appended value, written by the host with each append (the view shows the newest value of its history when it has one)."
      },
      "history": {
        "type": "integer",
        "minimum": 2,
        "default": 60,
        "writer": "host",
        "description": "Number of values kept and drawn."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "format": {
        "type": "string",
        "default": "%.4g",
        "writer": "host",
        "description": "printf-like spec of the last value (NUM-004)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "snapshot",
        "direction": "host-to-front",
        "description": "Whole kept history of the sparkline, oldest first; replaces the view's history. Sent in reply to sync_request and when history changes.",
        "fields": {
          "n": {
            "type": "integer",
            "description": "Number of values in the buffer."
          }
        },
        "buffers": [
          {
            "dtype": "<f4",
            "shape": [
              "n"
            ],
            "description": "Values, oldest first."
          }
        ]
      },
      {
        "type": "append",
        "direction": "host-to-front",
        "description": "New values appended to the history (the last one is the newest).",
        "fields": {
          "n": {
            "type": "integer"
          }
        },
        "buffers": [
          {
            "dtype": "<f4",
            "shape": [
              "n"
            ],
            "description": "Values, oldest first."
          }
        ]
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a snapshot. A host without history can ignore it.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "StackLight": {
    "className": "StackLight",
    "kind": "stacklight",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "stacklight"
        ],
        "default": "stacklight",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          120,
          200
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "tiers": {
        "type": "array",
        "minItems": 1,
        "maxItems": 5,
        "items": {
          "type": "enum",
          "values": [
            "red",
            "amber",
            "green",
            "blue",
            "white"
          ]
        },
        "default": [
          "red",
          "amber",
          "green"
        ],
        "writer": "host",
        "description": "Tier colors from top to bottom."
      },
      "labels": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "description": "Meaning of each tier, shown as text (A11Y-003)."
      },
      "value": {
        "type": "array",
        "itemDefault": "off",
        "items": {
          "type": "enum",
          "values": [
            "off",
            "on",
            "blink"
          ]
        },
        "default": [],
        "writer": "host",
        "resolved": true,
        "description": "State of each tier. Resolved to one state per tier: missing states are off, extra ones ignored, an unknown state reads as off (the Python class pads or cuts the list when the tiers change)."
      },
      "buzzer": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Show a sounding buzzer indicator (no sound is played)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "StateMachine": {
    "className": "StateMachine",
    "kind": "statemachine",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "statemachine"
        ],
        "default": "statemachine",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          720,
          380
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "machine": {
        "type": "object",
        "properties": {
          "states": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "x": {
                  "type": "number"
                },
                "y": {
                  "type": "number"
                },
                "acting": {
                  "type": "boolean"
                },
                "title": {
                  "type": "string"
                },
                "group": {
                  "type": "string"
                }
              }
            }
          },
          "transitions": {
            "type": "array",
            "items": {
              "type": "array"
            }
          },
          "commands": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "initial": {
            "type": "string"
          },
          "global_commands": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "zones": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "label": {
                  "type": "string"
                },
                "rects": {
                  "type": "array",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "number"
                    }
                  }
                },
                "commands": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "shade": {
                  "type": "boolean"
                }
              }
            }
          },
          "routes": {
            "type": "object"
          }
        },
        "default": {
          "states": [
            {
              "name": "Unholding",
              "x": 1,
              "y": 0,
              "acting": true
            },
            {
              "name": "Held",
              "x": 2,
              "y": 0,
              "acting": false
            },
            {
              "name": "Holding",
              "x": 3,
              "y": 0,
              "acting": true
            },
            {
              "name": "Idle",
              "x": 0,
              "y": 1,
              "acting": false
            },
            {
              "name": "Starting",
              "x": 1,
              "y": 1,
              "acting": true
            },
            {
              "name": "Execute",
              "x": 2,
              "y": 1,
              "acting": false
            },
            {
              "name": "Completing",
              "x": 3,
              "y": 1,
              "acting": true
            },
            {
              "name": "Complete",
              "x": 4,
              "y": 1,
              "acting": false
            },
            {
              "name": "Resetting",
              "x": 0,
              "y": 2,
              "acting": true
            },
            {
              "name": "Unsuspending",
              "x": 1,
              "y": 2,
              "acting": true
            },
            {
              "name": "Suspended",
              "x": 2,
              "y": 2,
              "acting": false
            },
            {
              "name": "Suspending",
              "x": 3,
              "y": 2,
              "acting": true
            },
            {
              "name": "Stopped",
              "x": 0,
              "y": 3,
              "acting": false
            },
            {
              "name": "Stopping",
              "x": 1,
              "y": 3,
              "acting": true
            },
            {
              "name": "Clearing",
              "x": 2,
              "y": 3,
              "acting": true
            },
            {
              "name": "Aborted",
              "x": 3,
              "y": 3,
              "acting": false
            },
            {
              "name": "Aborting",
              "x": 4,
              "y": 3,
              "acting": true
            }
          ],
          "transitions": [
            [
              "Stopped",
              "Reset",
              "Resetting"
            ],
            [
              "Resetting",
              "SC",
              "Idle"
            ],
            [
              "Idle",
              "Start",
              "Starting"
            ],
            [
              "Starting",
              "SC",
              "Execute"
            ],
            [
              "Execute",
              "SC",
              "Completing"
            ],
            [
              "Completing",
              "SC",
              "Complete"
            ],
            [
              "Complete",
              "Reset",
              "Resetting"
            ],
            [
              "Execute",
              "Hold",
              "Holding"
            ],
            [
              "Holding",
              "SC",
              "Held"
            ],
            [
              "Held",
              "Unhold",
              "Unholding"
            ],
            [
              "Unholding",
              "SC",
              "Execute"
            ],
            [
              "Execute",
              "Suspend",
              "Suspending"
            ],
            [
              "Suspending",
              "SC",
              "Suspended"
            ],
            [
              "Suspended",
              "Unsuspend",
              "Unsuspending"
            ],
            [
              "Unsuspending",
              "SC",
              "Execute"
            ],
            [
              "Stopping",
              "SC",
              "Stopped"
            ],
            [
              "Aborting",
              "SC",
              "Aborted"
            ],
            [
              "Aborted",
              "Clear",
              "Clearing"
            ],
            [
              "Clearing",
              "SC",
              "Stopped"
            ],
            [
              "Unholding",
              "Stop",
              "Stopping"
            ],
            [
              "Unholding",
              "Abort",
              "Aborting"
            ],
            [
              "Held",
              "Stop",
              "Stopping"
            ],
            [
              "Held",
              "Abort",
              "Aborting"
            ],
            [
              "Holding",
              "Stop",
              "Stopping"
            ],
            [
              "Holding",
              "Abort",
              "Aborting"
            ],
            [
              "Idle",
              "Stop",
              "Stopping"
            ],
            [
              "Idle",
              "Abort",
              "Aborting"
            ],
            [
              "Starting",
              "Stop",
              "Stopping"
            ],
            [
              "Starting",
              "Abort",
              "Aborting"
            ],
            [
              "Execute",
              "Stop",
              "Stopping"
            ],
            [
              "Execute",
              "Abort",
              "Aborting"
            ],
            [
              "Completing",
              "Stop",
              "Stopping"
            ],
            [
              "Completing",
              "Abort",
              "Aborting"
            ],
            [
              "Complete",
              "Stop",
              "Stopping"
            ],
            [
              "Complete",
              "Abort",
              "Aborting"
            ],
            [
              "Resetting",
              "Stop",
              "Stopping"
            ],
            [
              "Resetting",
              "Abort",
              "Aborting"
            ],
            [
              "Unsuspending",
              "Stop",
              "Stopping"
            ],
            [
              "Unsuspending",
              "Abort",
              "Aborting"
            ],
            [
              "Suspended",
              "Stop",
              "Stopping"
            ],
            [
              "Suspended",
              "Abort",
              "Aborting"
            ],
            [
              "Suspending",
              "Stop",
              "Stopping"
            ],
            [
              "Suspending",
              "Abort",
              "Aborting"
            ],
            [
              "Stopped",
              "Abort",
              "Aborting"
            ],
            [
              "Stopping",
              "Abort",
              "Aborting"
            ],
            [
              "Clearing",
              "Abort",
              "Aborting"
            ]
          ],
          "commands": [
            "Start",
            "Stop",
            "Hold",
            "Unhold",
            "Suspend",
            "Unsuspend",
            "Reset",
            "Abort",
            "Clear"
          ],
          "initial": "Stopped",
          "zones": [
            {
              "rects": [
                [
                  0,
                  0,
                  5,
                  3
                ],
                [
                  0,
                  3,
                  3,
                  4
                ]
              ],
              "commands": [
                "Abort"
              ],
              "shade": true
            },
            {
              "rects": [
                [
                  0,
                  0,
                  5,
                  3
                ]
              ],
              "commands": [
                "Stop"
              ]
            }
          ],
          "routes": {
            "Execute>Holding": [
              [
                2.8,
                1
              ],
              [
                3.5,
                1
              ]
            ],
            "Unholding>Execute": [
              [
                1.5,
                1
              ],
              [
                2.2,
                1
              ]
            ],
            "Execute>Suspending": [
              [
                2.8,
                2
              ],
              [
                3.5,
                2
              ]
            ],
            "Unsuspending>Execute": [
              [
                1.5,
                2
              ],
              [
                2.2,
                2
              ]
            ],
            "Complete>Resetting": [
              [
                4.5,
                2.8
              ],
              [
                0.3,
                2.8
              ]
            ],
            "Clearing>Stopped": [
              [
                2.5,
                3.85
              ],
              [
                0.5,
                3.85
              ]
            ]
          }
        },
        "writer": "host",
        "presets": {
          "packml": {
            "states": [
              {
                "name": "Unholding",
                "x": 1,
                "y": 0,
                "acting": true
              },
              {
                "name": "Held",
                "x": 2,
                "y": 0,
                "acting": false
              },
              {
                "name": "Holding",
                "x": 3,
                "y": 0,
                "acting": true
              },
              {
                "name": "Idle",
                "x": 0,
                "y": 1,
                "acting": false
              },
              {
                "name": "Starting",
                "x": 1,
                "y": 1,
                "acting": true
              },
              {
                "name": "Execute",
                "x": 2,
                "y": 1,
                "acting": false
              },
              {
                "name": "Completing",
                "x": 3,
                "y": 1,
                "acting": true
              },
              {
                "name": "Complete",
                "x": 4,
                "y": 1,
                "acting": false
              },
              {
                "name": "Resetting",
                "x": 0,
                "y": 2,
                "acting": true
              },
              {
                "name": "Unsuspending",
                "x": 1,
                "y": 2,
                "acting": true
              },
              {
                "name": "Suspended",
                "x": 2,
                "y": 2,
                "acting": false
              },
              {
                "name": "Suspending",
                "x": 3,
                "y": 2,
                "acting": true
              },
              {
                "name": "Stopped",
                "x": 0,
                "y": 3,
                "acting": false
              },
              {
                "name": "Stopping",
                "x": 1,
                "y": 3,
                "acting": true
              },
              {
                "name": "Clearing",
                "x": 2,
                "y": 3,
                "acting": true
              },
              {
                "name": "Aborted",
                "x": 3,
                "y": 3,
                "acting": false
              },
              {
                "name": "Aborting",
                "x": 4,
                "y": 3,
                "acting": true
              }
            ],
            "transitions": [
              [
                "Stopped",
                "Reset",
                "Resetting"
              ],
              [
                "Resetting",
                "SC",
                "Idle"
              ],
              [
                "Idle",
                "Start",
                "Starting"
              ],
              [
                "Starting",
                "SC",
                "Execute"
              ],
              [
                "Execute",
                "SC",
                "Completing"
              ],
              [
                "Completing",
                "SC",
                "Complete"
              ],
              [
                "Complete",
                "Reset",
                "Resetting"
              ],
              [
                "Execute",
                "Hold",
                "Holding"
              ],
              [
                "Holding",
                "SC",
                "Held"
              ],
              [
                "Held",
                "Unhold",
                "Unholding"
              ],
              [
                "Unholding",
                "SC",
                "Execute"
              ],
              [
                "Execute",
                "Suspend",
                "Suspending"
              ],
              [
                "Suspending",
                "SC",
                "Suspended"
              ],
              [
                "Suspended",
                "Unsuspend",
                "Unsuspending"
              ],
              [
                "Unsuspending",
                "SC",
                "Execute"
              ],
              [
                "Stopping",
                "SC",
                "Stopped"
              ],
              [
                "Aborting",
                "SC",
                "Aborted"
              ],
              [
                "Aborted",
                "Clear",
                "Clearing"
              ],
              [
                "Clearing",
                "SC",
                "Stopped"
              ],
              [
                "Unholding",
                "Stop",
                "Stopping"
              ],
              [
                "Unholding",
                "Abort",
                "Aborting"
              ],
              [
                "Held",
                "Stop",
                "Stopping"
              ],
              [
                "Held",
                "Abort",
                "Aborting"
              ],
              [
                "Holding",
                "Stop",
                "Stopping"
              ],
              [
                "Holding",
                "Abort",
                "Aborting"
              ],
              [
                "Idle",
                "Stop",
                "Stopping"
              ],
              [
                "Idle",
                "Abort",
                "Aborting"
              ],
              [
                "Starting",
                "Stop",
                "Stopping"
              ],
              [
                "Starting",
                "Abort",
                "Aborting"
              ],
              [
                "Execute",
                "Stop",
                "Stopping"
              ],
              [
                "Execute",
                "Abort",
                "Aborting"
              ],
              [
                "Completing",
                "Stop",
                "Stopping"
              ],
              [
                "Completing",
                "Abort",
                "Aborting"
              ],
              [
                "Complete",
                "Stop",
                "Stopping"
              ],
              [
                "Complete",
                "Abort",
                "Aborting"
              ],
              [
                "Resetting",
                "Stop",
                "Stopping"
              ],
              [
                "Resetting",
                "Abort",
                "Aborting"
              ],
              [
                "Unsuspending",
                "Stop",
                "Stopping"
              ],
              [
                "Unsuspending",
                "Abort",
                "Aborting"
              ],
              [
                "Suspended",
                "Stop",
                "Stopping"
              ],
              [
                "Suspended",
                "Abort",
                "Aborting"
              ],
              [
                "Suspending",
                "Stop",
                "Stopping"
              ],
              [
                "Suspending",
                "Abort",
                "Aborting"
              ],
              [
                "Stopped",
                "Abort",
                "Aborting"
              ],
              [
                "Stopping",
                "Abort",
                "Aborting"
              ],
              [
                "Clearing",
                "Abort",
                "Aborting"
              ]
            ],
            "commands": [
              "Start",
              "Stop",
              "Hold",
              "Unhold",
              "Suspend",
              "Unsuspend",
              "Reset",
              "Abort",
              "Clear"
            ],
            "initial": "Stopped",
            "zones": [
              {
                "rects": [
                  [
                    0,
                    0,
                    5,
                    3
                  ],
                  [
                    0,
                    3,
                    3,
                    4
                  ]
                ],
                "commands": [
                  "Abort"
                ],
                "shade": true
              },
              {
                "rects": [
                  [
                    0,
                    0,
                    5,
                    3
                  ]
                ],
                "commands": [
                  "Stop"
                ]
              }
            ],
            "routes": {
              "Execute>Holding": [
                [
                  2.8,
                  1
                ],
                [
                  3.5,
                  1
                ]
              ],
              "Unholding>Execute": [
                [
                  1.5,
                  1
                ],
                [
                  2.2,
                  1
                ]
              ],
              "Execute>Suspending": [
                [
                  2.8,
                  2
                ],
                [
                  3.5,
                  2
                ]
              ],
              "Unsuspending>Execute": [
                [
                  1.5,
                  2
                ],
                [
                  2.2,
                  2
                ]
              ],
              "Complete>Resetting": [
                [
                  4.5,
                  2.8
                ],
                [
                  0.3,
                  2.8
                ]
              ],
              "Clearing>Stopped": [
                [
                  2.5,
                  3.85
                ],
                [
                  0.5,
                  3.85
                ]
              ]
            }
          },
          "gemma": {
            "states": [
              {
                "name": "A6",
                "title": "Reset to the initial state",
                "group": "A: stop and restart procedures",
                "x": 0,
                "y": 0,
                "acting": true
              },
              {
                "name": "A1",
                "title": "Stop in the initial state",
                "group": "A: stop and restart procedures",
                "x": 1,
                "y": 0,
                "acting": false
              },
              {
                "name": "A2",
                "title": "Stop requested at end of cycle",
                "group": "A: stop and restart procedures",
                "x": 2,
                "y": 0,
                "acting": true
              },
              {
                "name": "A3",
                "title": "Stop requested in a given state",
                "group": "A: stop and restart procedures",
                "x": 3,
                "y": 0,
                "acting": true
              },
              {
                "name": "A4",
                "title": "Stop reached",
                "group": "A: stop and restart procedures",
                "x": 4,
                "y": 0,
                "acting": false
              },
              {
                "name": "A5",
                "title": "Preparation for restart after failure",
                "group": "A: stop and restart procedures",
                "x": 0,
                "y": 1,
                "acting": false
              },
              {
                "name": "A7",
                "title": "Set to a given state",
                "group": "A: stop and restart procedures",
                "x": 1,
                "y": 1,
                "acting": true
              },
              {
                "name": "F2",
                "title": "Preparation run",
                "group": "F: operating procedures",
                "x": 2,
                "y": 1,
                "acting": true
              },
              {
                "name": "F1",
                "title": "Normal production",
                "group": "F: operating procedures",
                "x": 3,
                "y": 1,
                "acting": false
              },
              {
                "name": "F3",
                "title": "Closing run",
                "group": "F: operating procedures",
                "x": 4,
                "y": 1,
                "acting": true
              },
              {
                "name": "F4",
                "title": "Check run out of order",
                "group": "F: operating procedures",
                "x": 1,
                "y": 2,
                "acting": false
              },
              {
                "name": "F5",
                "title": "Check run in order",
                "group": "F: operating procedures",
                "x": 2,
                "y": 2,
                "acting": false
              },
              {
                "name": "F6",
                "title": "Test run",
                "group": "F: operating procedures",
                "x": 3,
                "y": 2,
                "acting": false
              },
              {
                "name": "D1",
                "title": "Emergency stop",
                "group": "D: failure procedures",
                "x": 1,
                "y": 3,
                "acting": false
              },
              {
                "name": "D2",
                "title": "Failure diagnosis and treatment",
                "group": "D: failure procedures",
                "x": 2,
                "y": 3,
                "acting": false
              },
              {
                "name": "D3",
                "title": "Production despite a failure",
                "group": "D: failure procedures",
                "x": 3,
                "y": 3,
                "acting": false
              }
            ],
            "transitions": [
              [
                "A1",
                "Start",
                "F1"
              ],
              [
                "A1",
                "Prepare",
                "F2"
              ],
              [
                "F2",
                "SC",
                "F1"
              ],
              [
                "F1",
                "End of cycle",
                "A2"
              ],
              [
                "A2",
                "SC",
                "A1"
              ],
              [
                "F1",
                "Stop",
                "A3"
              ],
              [
                "A3",
                "SC",
                "A4"
              ],
              [
                "A4",
                "Start",
                "F1"
              ],
              [
                "F1",
                "Close",
                "F3"
              ],
              [
                "F3",
                "SC",
                "A1"
              ],
              [
                "A1",
                "Check",
                "F5"
              ],
              [
                "F5",
                "Finish",
                "A1"
              ],
              [
                "A1",
                "Step check",
                "F4"
              ],
              [
                "F4",
                "Finish",
                "A6"
              ],
              [
                "A1",
                "Test",
                "F6"
              ],
              [
                "F6",
                "Finish",
                "A1"
              ],
              [
                "F1",
                "Fault",
                "D2"
              ],
              [
                "F2",
                "Fault",
                "D2"
              ],
              [
                "F3",
                "Fault",
                "D2"
              ],
              [
                "D2",
                "Degraded run",
                "D3"
              ],
              [
                "D3",
                "End of cycle",
                "A2"
              ],
              [
                "D2",
                "Repaired",
                "A5"
              ],
              [
                "D1",
                "Rearm",
                "A5"
              ],
              [
                "A5",
                "To initial state",
                "A6"
              ],
              [
                "A5",
                "To given state",
                "A7"
              ],
              [
                "A6",
                "SC",
                "A1"
              ],
              [
                "A7",
                "SC",
                "A4"
              ],
              [
                "A6",
                "E-stop",
                "D1"
              ],
              [
                "A1",
                "E-stop",
                "D1"
              ],
              [
                "A2",
                "E-stop",
                "D1"
              ],
              [
                "A3",
                "E-stop",
                "D1"
              ],
              [
                "A4",
                "E-stop",
                "D1"
              ],
              [
                "A5",
                "E-stop",
                "D1"
              ],
              [
                "A7",
                "E-stop",
                "D1"
              ],
              [
                "F2",
                "E-stop",
                "D1"
              ],
              [
                "F1",
                "E-stop",
                "D1"
              ],
              [
                "F3",
                "E-stop",
                "D1"
              ],
              [
                "F4",
                "E-stop",
                "D1"
              ],
              [
                "F5",
                "E-stop",
                "D1"
              ],
              [
                "F6",
                "E-stop",
                "D1"
              ],
              [
                "D2",
                "E-stop",
                "D1"
              ],
              [
                "D3",
                "E-stop",
                "D1"
              ]
            ],
            "commands": [
              "Start",
              "Prepare",
              "End of cycle",
              "Stop",
              "Close",
              "Check",
              "Step check",
              "Test",
              "Finish",
              "Fault",
              "Degraded run",
              "Repaired",
              "E-stop",
              "Rearm",
              "To initial state",
              "To given state"
            ],
            "global_commands": [
              "E-stop"
            ],
            "initial": "A1",
            "zones": [
              {
                "rects": [
                  [
                    0,
                    0,
                    5,
                    3
                  ],
                  [
                    2,
                    3,
                    4,
                    4
                  ]
                ],
                "commands": [
                  "E-stop"
                ]
              }
            ]
          },
          "isa88": {
            "states": [
              {
                "name": "Restarting",
                "x": 1,
                "y": 0,
                "acting": true
              },
              {
                "name": "Held",
                "x": 2,
                "y": 0,
                "acting": false
              },
              {
                "name": "Holding",
                "x": 3,
                "y": 0,
                "acting": true
              },
              {
                "name": "Idle",
                "x": 0,
                "y": 1,
                "acting": false
              },
              {
                "name": "Running",
                "x": 2,
                "y": 1,
                "acting": false
              },
              {
                "name": "Complete",
                "x": 4,
                "y": 1,
                "acting": false
              },
              {
                "name": "Paused",
                "x": 2,
                "y": 2,
                "acting": false
              },
              {
                "name": "Pausing",
                "x": 3,
                "y": 2,
                "acting": true
              },
              {
                "name": "Stopped",
                "x": 0,
                "y": 3,
                "acting": false
              },
              {
                "name": "Stopping",
                "x": 1,
                "y": 3,
                "acting": true
              },
              {
                "name": "Aborting",
                "x": 3,
                "y": 3,
                "acting": true
              },
              {
                "name": "Aborted",
                "x": 4,
                "y": 3,
                "acting": false
              }
            ],
            "transitions": [
              [
                "Idle",
                "Start",
                "Running"
              ],
              [
                "Running",
                "SC",
                "Complete"
              ],
              [
                "Running",
                "Pause",
                "Pausing"
              ],
              [
                "Pausing",
                "SC",
                "Paused"
              ],
              [
                "Paused",
                "Resume",
                "Running"
              ],
              [
                "Running",
                "Hold",
                "Holding"
              ],
              [
                "Pausing",
                "Hold",
                "Holding"
              ],
              [
                "Paused",
                "Hold",
                "Holding"
              ],
              [
                "Holding",
                "SC",
                "Held"
              ],
              [
                "Held",
                "Restart",
                "Restarting"
              ],
              [
                "Restarting",
                "SC",
                "Running"
              ],
              [
                "Stopping",
                "SC",
                "Stopped"
              ],
              [
                "Aborting",
                "SC",
                "Aborted"
              ],
              [
                "Complete",
                "Reset",
                "Idle"
              ],
              [
                "Stopped",
                "Reset",
                "Idle"
              ],
              [
                "Aborted",
                "Reset",
                "Idle"
              ],
              [
                "Running",
                "Stop",
                "Stopping"
              ],
              [
                "Pausing",
                "Stop",
                "Stopping"
              ],
              [
                "Paused",
                "Stop",
                "Stopping"
              ],
              [
                "Holding",
                "Stop",
                "Stopping"
              ],
              [
                "Held",
                "Stop",
                "Stopping"
              ],
              [
                "Restarting",
                "Stop",
                "Stopping"
              ],
              [
                "Running",
                "Abort",
                "Aborting"
              ],
              [
                "Pausing",
                "Abort",
                "Aborting"
              ],
              [
                "Paused",
                "Abort",
                "Aborting"
              ],
              [
                "Holding",
                "Abort",
                "Aborting"
              ],
              [
                "Held",
                "Abort",
                "Aborting"
              ],
              [
                "Restarting",
                "Abort",
                "Aborting"
              ],
              [
                "Stopping",
                "Abort",
                "Aborting"
              ]
            ],
            "commands": [
              "Start",
              "Pause",
              "Resume",
              "Hold",
              "Restart",
              "Stop",
              "Abort",
              "Reset"
            ],
            "global_commands": [
              "Stop",
              "Abort"
            ],
            "initial": "Idle",
            "zones": [
              {
                "rects": [
                  [
                    1,
                    0,
                    4,
                    3
                  ],
                  [
                    1,
                    3,
                    2,
                    4
                  ]
                ],
                "commands": [
                  "Abort"
                ],
                "shade": true
              },
              {
                "rects": [
                  [
                    1,
                    0,
                    4,
                    3
                  ]
                ],
                "commands": [
                  "Stop"
                ]
              },
              {
                "rects": [
                  [
                    2,
                    1,
                    3,
                    3
                  ],
                  [
                    3,
                    2,
                    4,
                    3
                  ]
                ],
                "commands": [
                  "Hold"
                ]
              }
            ],
            "routes": {
              "Restarting>Running": [
                [
                  1.5,
                  1
                ],
                [
                  2.2,
                  1
                ]
              ],
              "Running>Pausing": [
                [
                  2.8,
                  2
                ],
                [
                  3.25,
                  2
                ]
              ],
              "Complete>Idle": [
                [
                  4.5,
                  2.88
                ],
                [
                  0.3,
                  2.88
                ]
              ],
              "Aborted>Idle": [
                [
                  4.5,
                  2.88
                ],
                [
                  0.3,
                  2.88
                ]
              ]
            }
          }
        },
        "description": "State model: {states: [{name, x, y, acting, title, group}], transitions: [[from, command, to]], commands, initial, global_commands, zones, routes}; the command SC completes an acting state (a host event). Missing positions, acting flags, commands and initial state are completed as the kernel does; an invalid model reads as this default (PackML)."
      },
      "value": {
        "type": "string",
        "default": "",
        "writer": "derived",
        "readOnly": true,
        "resolved": true,
        "description": "Current state. Empty or unknown: the initial state of the model. Written by the host, or by the front end when it applies an operator command without a host (HOST-012)."
      },
      "available_commands": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "derived",
        "readOnly": true,
        "resolved": true,
        "description": "Commands valid in the current state (IND-061). Derived from machine and value."
      },
      "last_command": {
        "type": "string",
        "default": "",
        "writer": "derived",
        "readOnly": true,
        "description": "Last command applied."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "command",
        "direction": "front-to-host",
        "description": "Operator command (only those in available_commands are offered). Also sent when the front end applies it itself.",
        "fields": {
          "command": {
            "type": "string"
          }
        },
        "buffers": []
      },
      {
        "type": "rejected",
        "direction": "host-to-front",
        "description": "A command that is not valid in the current state.",
        "fields": {
          "command": {
            "type": "string"
          },
          "state": {
            "type": "string"
          }
        },
        "buffers": []
      }
    ]
  },
  "SvgPanel": {
    "className": "SvgPanel",
    "kind": "svgpanel",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "svgpanel"
        ],
        "default": "svgpanel",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          400,
          300
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "svg": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "SVG document. Python sanitizes it; the front end sanitizes it again (no scripts, event handlers or external resources). A role is read from the data-awi attribute of an element, else from its inkscape:label attribute."
      },
      "value": {
        "type": "object",
        "default": {},
        "writer": "both",
        "description": "Values of the bound names: numbers, texts, Booleans or null (shown as a dash). Written by the host, and by the operator through control roles in control mode; the kernel refuses a step value outside its limits."
      },
      "problems": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Elements with an unknown role or an invalid option, as '<element>: <reason>' (IND-125). Computed by Python; without a kernel the front end shows its own list."
      },
      "show_entries": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Show an entry field for each value of a step control (IND-124)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "SynopticCanvas": {
    "className": "SynopticCanvas",
    "kind": "synoptic",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "synoptic"
        ],
        "default": "synoptic",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          640,
          360
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "widget": {
              "type": "string"
            },
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Widgets placed on the canvas {widget, x, y}. The children are rendered through the host widget manager (Jupyter, marimo); a host without one gets a placeholder per child, while the pipes and the background still render (HOST-009)."
      },
      "pipes": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "points": {
              "type": "array",
              "minItems": 2,
              "items": {
                "type": "array",
                "minItems": 2,
                "maxItems": 2,
                "prefixItems": [
                  {
                    "type": "number"
                  },
                  {
                    "type": "number"
                  }
                ]
              }
            },
            "flow": {
              "type": "boolean"
            },
            "direction": {
              "type": "enum",
              "values": [
                "forward",
                "reverse"
              ]
            },
            "color": {
              "type": "string"
            },
            "thickness": {
              "type": "number"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Pipe runs {points, flow, direction, color, thickness} drawn by the canvas, with an optional flow animation."
      },
      "background": {
        "type": "bytes",
        "default": "",
        "writer": "host",
        "description": "PNG, JPEG or SVG image bytes; empty: none. A binary buffer in Jupyter; a host that only sends JSON may send base64 text. An SVG is shown through an image element: its scripts and external loads are disabled."
      },
      "background_mime": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": 'Type of the background: "image/png", "image/jpeg" or "image/svg+xml", set by Python from the bytes. When empty or another value, the front end detects the type from the bytes the same way.'
      },
      "value": {
        "type": "object",
        "default": {},
        "writer": "host",
        "readOnly": true,
        "description": "Unused (always empty)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Tank": {
    "className": "Tank",
    "kind": "tank",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "tank"
        ],
        "default": "tank",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          120,
          200
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "fill_color": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "CSS color of the liquid; empty: the theme color. Unsafe colors are ignored (SEC-002)."
      },
      "markers": {
        "type": "array",
        "items": {
          "type": "number"
        },
        "default": [],
        "writer": "host",
        "description": "Level markers drawn on the tank, in scale units."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "ThemeSwitch": {
    "className": "ThemeSwitch",
    "kind": "themeswitch",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "themeswitch"
        ],
        "default": "themeswitch",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          240,
          30
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "page_theme": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Also switch the notebook page theme where the host allows it (marimo)."
      },
      "value": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "system",
          "dark"
        ],
        "default": "auto",
        "writer": "both",
        "description": "Selected theme; auto until a position is chosen. With a Python kernel, every widget of the kernel follows it; other hosts apply the page theme only (STYLE-008)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "Thermometer": {
    "className": "Thermometer",
    "kind": "thermometer",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "thermometer"
        ],
        "default": "thermometer",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          100,
          220
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": -20,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 120,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "°C",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 7,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "fill_color": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "CSS color of the fluid column; empty: the theme color. Unsafe colors are ignored (SEC-002)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "ToggleSwitch": {
    "className": "ToggleSwitch",
    "kind": "toggleswitch",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "toggleswitch"
        ],
        "default": "toggleswitch",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          60,
          100
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels. The Python class uses (100, 60) when created horizontal; other hosts give the size with the orientation."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "boolean",
        "default": false,
        "writer": "both",
        "description": "State of the control or indicator. Set by the host, or by the user in control mode."
      },
      "default_state": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "State a latch returns to once the host has read it (BOOL-008)."
      },
      "mechanical_action": {
        "type": "enum",
        "values": [
          "switch_when_pressed",
          "switch_when_released",
          "switch_until_released",
          "latch_when_pressed",
          "latch_when_released",
          "latch_until_released"
        ],
        "default": "switch_when_pressed",
        "writer": "host",
        "description": "How the control reacts to the pointer (BOOL-007). With a latch, the host reads the value and restores default_state; without a host that does it, a latched value stays set."
      },
      "latch_timeout": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which an unread latch expires (host side); 0: never."
      },
      "confirm": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Ask for a confirmation before changing the value (BOOL-011)."
      },
      "_pressed": {
        "type": "boolean",
        "default": false,
        "writer": "front",
        "description": "True while the pointer (or Space / Enter) is held on the control."
      },
      "_seq": {
        "type": "integer",
        "default": 0,
        "writer": "front",
        "description": "Sequence number of the last press / release update sent by the front end; a host drops an update whose number is not newer (BOOL-010)."
      },
      "orientation": {
        "type": "enum",
        "values": [
          "vertical",
          "horizontal"
        ],
        "default": "vertical",
        "writer": "host",
        "description": "Lever direction."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "latch_expired",
        "direction": "host-to-front",
        "description": "An unread latch expired (latch_timeout): the view flashes.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "Transmitter": {
    "className": "Transmitter",
    "kind": "transmitter",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "transmitter"
        ],
        "default": "transmitter",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          110,
          84
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.2f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "status": {
        "type": "enum",
        "values": [
          "ok",
          "failure",
          "check",
          "out_of_spec",
          "maintenance"
        ],
        "default": "ok",
        "writer": "host",
        "description": "Device status after the NAMUR NE 107 categories: ok, failure, check (function check), out_of_spec, maintenance (IND-081). While failure, the value is shown invalid (IND-082)."
      },
      "status_text": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Optional detail of the status, e.g. the diagnostic message."
      },
      "tag": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Instrument tag, e.g. LT-101: function letters above the line, loop number below (IND-080)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "TrendChart": {
    "className": "TrendChart",
    "kind": "trendchart",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "trendchart"
        ],
        "default": "trendchart",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          560,
          260
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "cursors": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "both",
        "description": "Cursors {x, name, color} (CHART-104). Dragged or typed by the operator, also on indicators; a host may complete a missing name as C<n> (Python does)."
      },
      "cursor_values": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "x": {
              "type": "number"
            },
            "values": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Readout of the cursors for the host program, {name, x, values}, computed by the host from its data. The front end draws its own readout and does not read this trait."
      },
      "annotations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "text": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Text annotations {x, y, text, color} in data coordinates (CHART-105)."
      },
      "export": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Offer CSV, PNG and SVG downloads in the toolbar (CHART-107)."
      },
      "x_unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "value": {
        "type": "object",
        "default": {},
        "writer": "host",
        "readOnly": true,
        "description": "Latest value of each pen, by pen name, written by the host with each append."
      },
      "pens": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "unit": {
              "type": "string"
            },
            "min": {
              "type": "number"
            },
            "max": {
              "type": "number"
            },
            "color": {
              "type": "string"
            },
            "lolo": {
              "nullable": true,
              "type": "number"
            },
            "lo": {
              "nullable": true,
              "type": "number"
            },
            "hi": {
              "nullable": true,
              "type": "number"
            },
            "hihi": {
              "nullable": true,
              "type": "number"
            },
            "setpoint": {
              "nullable": true,
              "type": "number"
            },
            "format": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Pens {name, unit, min, max, color, lolo, lo, hi, hihi, setpoint, format}. Python normalizes them (a string is a pen name, missing keys get their defaults) and rejects duplicate names, unknown keys and max <= min; the front end shows an invalid scale as 0 .. 100."
      },
      "span": {
        "type": "number",
        "minimum": 1,
        "default": 600,
        "writer": "both",
        "description": "Seconds shown; set by the operator with the span selector."
      },
      "history": {
        "type": "integer",
        "minimum": 2,
        "default": 1e4,
        "writer": "host",
        "description": "Samples kept per pen (IND-074)."
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "append",
        "direction": "host-to-front",
        "description": "New samples of some pens. When more than history samples of a pen were added, only the last history are sent and total keeps the count right.",
        "fields": {
          "pens": {
            "type": "array",
            "items": {
              "type": "array",
              "prefixItems": [
                {
                  "type": "integer",
                  "minimum": 0
                },
                {
                  "type": "integer",
                  "minimum": 0
                },
                {
                  "type": "integer",
                  "minimum": 0
                }
              ],
              "minItems": 3,
              "maxItems": 3
            },
            "description": "One entry per pen with samples: [pen index in pens, n samples sent, total samples of the pen since the last clear]."
          }
        },
        "repeat": "pens",
        "buffers": [
          {
            "dtype": "<f8",
            "shape": [
              "n"
            ],
            "description": "Times of the samples of the entry, Unix seconds, chronological."
          },
          {
            "dtype": "<f4",
            "shape": [
              "n"
            ],
            "description": "Values of the samples of the entry."
          }
        ]
      },
      {
        "type": "snapshot",
        "direction": "host-to-front",
        "description": "Kept samples of every pen, in reply to sync_request and when pens or history change.",
        "fields": {
          "pens": {
            "type": "array",
            "items": {
              "type": "array",
              "prefixItems": [
                {
                  "type": "integer",
                  "minimum": 0
                },
                {
                  "type": "integer",
                  "minimum": 0
                },
                {
                  "type": "integer",
                  "minimum": 0
                }
              ],
              "minItems": 3,
              "maxItems": 3
            },
            "description": "One entry per pen with samples: [pen index in pens, n samples sent, total samples of the pen since the last clear]."
          }
        },
        "repeat": "pens",
        "buffers": [
          {
            "dtype": "<f8",
            "shape": [
              "n"
            ],
            "description": "Times of the samples of the entry, Unix seconds, chronological."
          },
          {
            "dtype": "<f4",
            "shape": [
              "n"
            ],
            "description": "Values of the samples of the entry."
          }
        ]
      },
      {
        "type": "clear",
        "direction": "host-to-front",
        "description": "Forget every sample.",
        "fields": {},
        "buffers": []
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a snapshot. A host without history can ignore it.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "Valve": {
    "className": "Valve",
    "kind": "valve",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "valve"
        ],
        "default": "valve",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "control",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          90,
          90
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "tag": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Instrument tag shown on the faceplate (e.g. P-101)."
      },
      "auto": {
        "type": "boolean",
        "default": true,
        "writer": "both",
        "description": "Automatic mode: the commands are disabled on the faceplate. The faceplate AUTO / MANUAL buttons send auto and manual commands; without a host owning the state, the front end applies them itself (HOST-012)."
      },
      "simulate": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "A command sets the state itself (teaching, simulations): see the x-awi-simulated table of commands. Applied by the host when it owns the state, otherwise by the front end."
      },
      "commands": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "default": [
          "open",
          "close"
        ],
        "writer": "host",
        "readOnly": true,
        "simulated": {
          "open": "open",
          "close": "closed"
        },
        "description": "Commands offered on the faceplate (a constant of each widget)."
      },
      "value": {
        "type": "enum",
        "values": [
          "open",
          "closed",
          "transit",
          "fault"
        ],
        "default": "closed",
        "writer": "host",
        "description": "Valve state (feedback from the process)."
      },
      "position": {
        "nullable": true,
        "type": "number",
        "minimum": 0,
        "maximum": 100,
        "default": null,
        "writer": "host",
        "description": "Opening in % for a control valve (feedback); null: on/off valve. A control valve faceplate also takes a position demand in manual mode (with simulate, applied to position and value)."
      },
      "orientation": {
        "type": "enum",
        "values": [
          "horizontal",
          "vertical"
        ],
        "default": "horizontal",
        "writer": "host"
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "command",
        "direction": "front-to-host",
        "description": "Operator command from the faceplate: one of commands, or auto / manual. Also sent when the front end applies it itself.",
        "fields": {
          "command": {
            "type": "string"
          }
        },
        "buffers": []
      },
      {
        "type": "command",
        "direction": "front-to-host",
        "description": "Position demand of a control valve, 0 to 100 %, manual mode only.",
        "fields": {
          "command": {
            "const": "position"
          },
          "value": {
            "type": "number",
            "minimum": 0,
            "maximum": 100
          }
        },
        "buffers": []
      }
    ]
  },
  "VUMeter": {
    "className": "VUMeter",
    "kind": "vumeter",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "vumeter"
        ],
        "default": "vumeter",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          60,
          200
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "value": {
        "type": "number",
        "nonfinite": true,
        "default": 0,
        "writer": "both",
        "description": "Current value. Set by the host, or by the user in control mode. Shown clamped to [min, max] when coerce is set (NUM-006, NUM-010)."
      },
      "min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Lower end of the scale; must be below max, and > 0 on a log scale."
      },
      "max": {
        "type": "number",
        "default": 100,
        "writer": "host",
        "description": "Upper end of the scale."
      },
      "step": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Values entered by the user snap to min + k * step; 0: no snapping (NUM-005)."
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host"
      },
      "ticks": {
        "type": "integer",
        "minimum": 1,
        "default": 5,
        "writer": "host",
        "description": "Major scale intervals."
      },
      "minor_ticks": {
        "type": "integer",
        "minimum": 0,
        "default": 4,
        "writer": "host",
        "description": "Minor subdivisions per major interval."
      },
      "format": {
        "type": "string",
        "default": "%.1f",
        "writer": "host",
        "description": "printf-like spec: %.2f, %.3e, %.3g, %.3n (engineering), %.3s (SI prefix) (NUM-004); %X, %x, %b, %o show the value as a hexadecimal, binary or octal integer, with an optional width padded with zeros such as %04X (IND-110), and values are then typed in that base."
      },
      "coerce": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Clamp values to [min, max] instead of rejecting typed values outside it (NUM-010)."
      },
      "update_rate": {
        "type": "number",
        "minimum": 1,
        "default": 30,
        "writer": "host",
        "description": "Maximum rate of intermediate values sent while dragging, in Hz (NUM-009)."
      },
      "entry": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Editable value field in control mode (API-014)."
      },
      "animate": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "animation_ms": {
        "type": "integer",
        "minimum": 0,
        "maximum": 300,
        "default": 200,
        "writer": "host"
      },
      "value_labels": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "value": {
              "type": "number"
            },
            "label": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Named values, sorted by value (IND-118): the scale shows the labels instead of numbers, the readout the label of the current value (within 1e-9 of the span), and the value field accepts a label (case ignored)."
      },
      "lolo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low-low alarm limit (ALARM-001)."
      },
      "lo": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Low alarm limit."
      },
      "hi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High alarm limit."
      },
      "hihi": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "High-high alarm limit."
      },
      "deadband": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Hysteresis: a level is left only when the value is back past its limit by at least deadband (ALARM-003)."
      },
      "show_limits": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Draw the alarm limits on the scale."
      },
      "alarm_level": {
        "type": "enum",
        "values": [
          "normal",
          "lo",
          "lolo",
          "hi",
          "hihi"
        ],
        "default": "normal",
        "writer": "derived",
        "readOnly": true,
        "description": "Alarm level of value (ALARM-002, ALARM-003). Derived: computed by the host when it owns the state (_session non-empty), otherwise by the front end, which writes it back (HOST-004)."
      },
      "raw_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Engineering scaling: raw reading at eng_min (UNIT-003). Used by the host API only."
      },
      "raw_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "eng_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "peak_hold": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Track and show the highest value (NUM-110)."
      },
      "peak_decay": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": "Seconds after which the held peak is released at the next value; 0: held until reset."
      },
      "peak": {
        "nullable": true,
        "type": "number",
        "nonfinite": true,
        "default": null,
        "writer": "derived",
        "readOnly": true,
        "description": "Held peak, null when none. Derived from the history of value (time dependent): by the host when it owns the state, otherwise by the front end (HOST-004)."
      },
      "segments": {
        "type": "integer",
        "minimum": 2,
        "default": 20,
        "writer": "host",
        "description": "Number of segments."
      },
      "orientation": {
        "type": "enum",
        "values": [
          "vertical",
          "horizontal"
        ],
        "default": "vertical",
        "writer": "host"
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      }
    ]
  },
  "WaveformChart": {
    "className": "WaveformChart",
    "kind": "waveformchart",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "waveformchart"
        ],
        "default": "waveformchart",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          480,
          240
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "cursors": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "both",
        "description": "Cursors {x, name, color} (CHART-104). Dragged or typed by the operator, also on indicators; a host may complete a missing name as C<n> (Python does)."
      },
      "cursor_values": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "x": {
              "type": "number"
            },
            "values": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Readout of the cursors for the host program, {name, x, values}, computed by the host from its data. The front end draws its own readout and does not read this trait."
      },
      "annotations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "text": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Text annotations {x, y, text, color} in data coordinates (CHART-105)."
      },
      "export": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Offer CSV, PNG and SVG downloads in the toolbar (CHART-107)."
      },
      "x_unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "value": {
        "type": "array",
        "items": {
          "type": "any"
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Latest sample of each trace, written by the host with each append."
      },
      "history": {
        "type": "integer",
        "minimum": 2,
        "default": 1024,
        "writer": "host",
        "description": "Points kept and shown per trace."
      },
      "n_traces": {
        "type": "integer",
        "minimum": 1,
        "default": 1,
        "writer": "host"
      },
      "update_mode": {
        "type": "enum",
        "values": [
          "strip",
          "scope",
          "sweep"
        ],
        "default": "strip",
        "writer": "host",
        "description": "strip: continuous scroll; scope: fill then restart; sweep: a moving cursor overwrites the oldest data."
      },
      "y_min": {
        "type": "number",
        "default": -1,
        "writer": "both",
        "description": "Y range when autoscale_y is off; set by the operator with the axes panel."
      },
      "y_max": {
        "type": "number",
        "default": 1,
        "writer": "both"
      },
      "autoscale_y": {
        "type": "boolean",
        "default": false,
        "writer": "both"
      },
      "y_scale": {
        "type": "enum",
        "values": [
          "linear",
          "log"
        ],
        "default": "linear",
        "writer": "host",
        "description": "Scale of the left Y axis; on a logarithmic axis values <= 0 are not drawn, and a range reaching 0 or below starts at y_max / 1000 (IND-117)."
      },
      "y2_min": {
        "type": "number",
        "default": 0,
        "writer": "host",
        "description": "Range of the secondary axis on the right, for the traces with axis right, when autoscale_y2 is off (IND-117)."
      },
      "y2_max": {
        "type": "number",
        "default": 1,
        "writer": "host"
      },
      "autoscale_y2": {
        "type": "boolean",
        "default": false,
        "writer": "host"
      },
      "y2_unit": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Unit of the secondary axis, shown under it and after the values of its traces under a cursor."
      },
      "paused": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Freeze the display; samples keep arriving (CHART-009)."
      },
      "dt": {
        "type": "number",
        "default": 1,
        "writer": "host",
        "description": "Sample interval in x-axis units; 0 is shown as 1."
      },
      "traces": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "width": {
              "type": "number"
            },
            "visible": {
              "type": "boolean"
            },
            "axis": {
              "type": "enum",
              "values": [
                "left",
                "right"
              ]
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Optional style of each trace {name, color, width, visible, axis}."
      },
      "show_legend": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "append",
        "direction": "host-to-front",
        "description": "New samples. total counts every sample appended since the last clear; when more than history points were appended, only the last history are sent and total keeps the count right.",
        "fields": {
          "n_points": {
            "type": "integer",
            "minimum": 0
          },
          "total": {
            "type": "integer",
            "minimum": 0
          }
        },
        "buffers": [
          {
            "dtype": "<f4",
            "shape": [
              "n_points",
              "n_traces"
            ],
            "order": "C",
            "description": "Samples, oldest first, one row per point and one column per trace."
          }
        ]
      },
      {
        "type": "snapshot",
        "direction": "host-to-front",
        "description": "Whole kept history (at most history points), in reply to sync_request and when history or n_traces changes.",
        "fields": {
          "n_points": {
            "type": "integer",
            "minimum": 0
          },
          "total": {
            "type": "integer",
            "minimum": 0
          }
        },
        "buffers": [
          {
            "dtype": "<f4",
            "shape": [
              "n_points",
              "n_traces"
            ],
            "order": "C",
            "description": "Samples, oldest first, one row per point and one column per trace."
          }
        ]
      },
      {
        "type": "clear",
        "direction": "host-to-front",
        "description": "Empty the history.",
        "fields": {},
        "buffers": []
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a snapshot. A host without history can ignore it.",
        "fields": {},
        "buffers": []
      }
    ]
  },
  "XYGraph": {
    "className": "XYGraph",
    "kind": "xygraph",
    "abstract": false,
    "traits": {
      "_kind": {
        "type": "const",
        "values": [
          "xygraph"
        ],
        "default": "xygraph",
        "writer": "host",
        "description": "Front-end renderer identifier; each widget schema fixes it with a const."
      },
      "mode": {
        "type": "enum",
        "values": [
          "control",
          "indicator"
        ],
        "default": "indicator",
        "writer": "host",
        "description": '"control": the user sets the value; "indicator": display only.'
      },
      "label": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text, never interpreted as HTML (SEC-002)."
      },
      "disabled": {
        "type": "boolean",
        "default": false,
        "writer": "host",
        "description": "Greyed out, input rejected."
      },
      "visible": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      },
      "tooltip": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Plain text shown on hover."
      },
      "size": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          {
            "type": "integer",
            "exclusiveMinimum": 0
          },
          {
            "type": "integer",
            "exclusiveMinimum": 0
          }
        ],
        "default": [
          480,
          300
        ],
        "writer": "host",
        "description": "[width, height] in CSS pixels."
      },
      "style": {
        "type": "enum",
        "values": [
          "modern",
          "classic",
          "system"
        ],
        "default": "modern",
        "writer": "host"
      },
      "theme": {
        "type": "enum",
        "values": [
          "auto",
          "light",
          "dark",
          "system"
        ],
        "default": "auto",
        "writer": "host",
        "description": '"auto": the style decides; "system": the host page or the operating system (STYLE-007).'
      },
      "skin": {
        "type": "object",
        "keys": [
          "background",
          "housing",
          "knob",
          "needle"
        ],
        "default": {},
        "writer": "host",
        "description": "Replaceable drawing parts: part name -> SVG source, sanitized (STYLE-005, STYLE-006)."
      },
      "_session": {
        "type": "string",
        "default": "",
        "writer": "host",
        "description": "Identity of the host session that owns the state. Non-empty: the host is authoritative for derived traits and may announce heartbeats (HOST-003, HOST-004). Empty (default): the front end computes derived traits itself."
      },
      "_heartbeat": {
        "type": "number",
        "minimum": 0,
        "default": 0,
        "writer": "host",
        "description": 'Heartbeat period announced by the host, in seconds. 0 (default): no stale-data detection. With a non-empty _session and a period > 0, the host sends {"type": "hb", "session": _session} every period (ROB-001, HOST-003).'
      },
      "cursors": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "both",
        "description": "Cursors {x, name, color} (CHART-104). Dragged or typed by the operator, also on indicators; a host may complete a missing name as C<n> (Python does)."
      },
      "cursor_values": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "x": {
              "type": "number"
            },
            "values": {
              "type": "array",
              "items": {
                "type": "any"
              }
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Readout of the cursors for the host program, {name, x, values}, computed by the host from its data. The front end draws its own readout and does not read this trait."
      },
      "annotations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "x": {
              "type": "number"
            },
            "y": {
              "type": "number"
            },
            "text": {
              "type": "string"
            },
            "color": {
              "type": "string"
            }
          }
        },
        "default": [],
        "writer": "host",
        "description": "Text annotations {x, y, text, color} in data coordinates (CHART-105)."
      },
      "export": {
        "type": "boolean",
        "default": true,
        "writer": "host",
        "description": "Offer CSV, PNG and SVG downloads in the toolbar (CHART-107)."
      },
      "x_unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "unit": {
        "type": "string",
        "default": "",
        "writer": "host"
      },
      "value": {
        "type": "object",
        "properties": {
          "sets": {
            "type": "integer"
          },
          "points": {
            "type": "integer"
          }
        },
        "default": {},
        "writer": "host",
        "readOnly": true,
        "description": "Number of data sets and of points {sets, points}, written by the host with each data message."
      },
      "series": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "color": {
              "type": "string"
            },
            "style": {
              "type": "enum",
              "values": [
                "line",
                "markers",
                "both",
                "step",
                "bar"
              ]
            },
            "width": {
              "type": "number"
            }
          }
        },
        "default": [],
        "writer": "host",
        "readOnly": true,
        "description": "Data sets {name, color, style, width}, drawn in order. A set whose data have not arrived is not drawn; data of a name not listed here are dropped."
      },
      "x_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "X range; null: from the data."
      },
      "x_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "y_min": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "Y range; null: from the data."
      },
      "y_max": {
        "nullable": true,
        "type": "number",
        "default": null,
        "writer": "host",
        "description": "A number, or null when not set."
      },
      "show_legend": {
        "type": "boolean",
        "default": true,
        "writer": "host"
      }
    },
    "messages": [
      {
        "type": "hb",
        "direction": "host-to-front",
        "description": "Heartbeat, sent every _heartbeat seconds when the host announces liveness.",
        "fields": {
          "session": {
            "type": "string"
          },
          "interval": {
            "type": "number"
          }
        },
        "buffers": []
      },
      {
        "type": "data",
        "direction": "host-to-front",
        "description": "Data of some sets (clear false: the other sets keep theirs) or of every set (clear true: the sets not sent have no data). Sent when a set is plotted or removed and in reply to sync_request.",
        "fields": {
          "clear": {
            "type": "boolean"
          },
          "sets": {
            "type": "array",
            "items": {
              "type": "array",
              "prefixItems": [
                {
                  "type": "string"
                },
                {
                  "type": "integer",
                  "minimum": 0
                }
              ],
              "minItems": 2,
              "maxItems": 2
            },
            "description": "[name, n] of each set sent."
          }
        },
        "repeat": "sets",
        "buffers": [
          {
            "dtype": "<f8",
            "shape": [
              "n"
            ],
            "description": "x of the points of the set."
          },
          {
            "dtype": "<f8",
            "shape": [
              "n"
            ],
            "description": "y of the points."
          }
        ]
      },
      {
        "type": "sync_request",
        "direction": "front-to-host",
        "description": "Sent by each new view: the host answers with a data message holding every set (clear true).",
        "fields": {},
        "buffers": []
      }
    ]
  }
};
var BY_KIND = Object.fromEntries(
  Object.values(CONTRACTS).filter((c) => !c.abstract).map((c) => [c.kind, c])
);

// js/src/contract/alarm.ts
var HIGH = ["normal", "hi", "hihi"];
var LOW = ["normal", "lo", "lolo"];
var set = (v) => v !== null && v !== void 0;
function rawLevel(value, { lolo, lo, hi, hihi }) {
  if (set(hihi) && value >= hihi) return "hihi";
  if (set(hi) && value >= hi) return "hi";
  if (set(lolo) && value <= lolo) return "lolo";
  if (set(lo) && value <= lo) return "lo";
  return "normal";
}
function computeAlarmLevel(value, limits = {}) {
  const previous = limits.previous ?? "normal";
  const deadband = limits.deadband ?? 0;
  if (!Number.isFinite(value)) return previous;
  const raw = rawLevel(value, limits);
  const bounds = { lolo: limits.lolo, lo: limits.lo, hi: limits.hi, hihi: limits.hihi };
  for (const [side2, sign] of [[HIGH, 1], [LOW, -1]]) {
    const p = side2.indexOf(previous);
    const r = side2.indexOf(raw);
    if (p >= 1 && r >= 0 && r < p) {
      let level = previous;
      while (side2.indexOf(level) > r) {
        const limit = bounds[level];
        if (set(limit) && sign * (value - limit) > -deadband) return level;
        level = side2[side2.indexOf(level) - 1];
      }
      return raw;
    }
  }
  return raw;
}

// js/src/contract/transitions.ts
function applyTransition(table, state, event) {
  const row = table?.find(([from, on]) => from === state && on === event);
  return row ? row[2] : state;
}

// js/src/contract/alarms.ts
function keepRow(r, list) {
  return r.state !== "normal" || list && (r.shelved_until != null || !!r.suppressed || !!r.out_of_service);
}
function acknowledgeRows(rows, id, table, list) {
  return rows.map((r) => id === null || r.id === id ? { ...r, state: applyTransition(table, r.state, "acknowledge") } : r).filter((r) => keepRow(r, list));
}
var pad = (n) => String(n).padStart(2, "0");
function localIso(ms) {
  const d = new Date(Math.floor(ms / 1e3) * 1e3);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function isoMs(iso) {
  return new Date(iso).getTime();
}
function shelveRow(rows, id, seconds, maxShelve, nowMs) {
  if (!(seconds > 0 && seconds <= maxShelve) || !rows.some((r) => r.id === id)) return null;
  return rows.map((r) => r.id === id ? { ...r, shelved_until: localIso(nowMs + seconds * 1e3) } : r);
}
function unshelveRow(rows, id) {
  return rows.map((r) => r.id === id ? { ...r, shelved_until: null } : r).filter((r) => keepRow(r, true));
}
function expireShelving(rows, nowMs) {
  const expired = rows.filter((r) => r.shelved_until != null && isoMs(String(r.shelved_until)) <= nowMs).map((r) => r.id);
  if (!expired.length) return { rows: [...rows], expired };
  return { rows: rows.map((r) => expired.includes(r.id) ? { ...r, shelved_until: null } : r).filter((r) => keepRow(r, true)), expired };
}
function nextExpiry(rows) {
  const times = rows.filter((r) => r.shelved_until != null).map((r) => isoMs(String(r.shelved_until)));
  return times.length ? Math.min(...times) : null;
}

// js/src/contract/annunciator.ts
var CLEARED = { A: "normal", M: "acknowledged", R: "ringback" };
function annunciatorTransition(state, active, event, sequence) {
  if (event === "process") {
    if (active && (state === "normal" || state === "ringback")) return "alert";
    if (!active && state === "acknowledged") return CLEARED[sequence];
    return state;
  }
  if (event === "acknowledge") {
    if (state !== "alert") return state;
    return active ? "acknowledged" : CLEARED[sequence];
  }
  if (active) return state;
  if (sequence === "M" && state === "acknowledged" || sequence === "R" && state === "ringback") return "normal";
  return state;
}
function normalizeWindows(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((w) => !!w && typeof w === "object" && typeof w.tag === "string").map((w) => ({
    tag: w.tag,
    text: typeof w.text === "string" ? w.text : "",
    color: typeof w.color === "string" ? w.color : "amber",
    active: !!w.active,
    state: typeof w.state === "string" ? w.state : "normal",
    first: !!w.first
  }));
}
var copy = (p) => ({ ...p, windows: p.windows.map((w) => ({ ...w })) });
function setProcess(panel, tag, active) {
  const p = copy(panel);
  const w = p.windows.find((x) => x.tag === tag);
  if (!w) return p;
  w.active = active;
  const old = w.state;
  w.state = annunciatorTransition(old, active, "process", p.sequence);
  if ((w.state === "alert" || w.state === "ringback") && old !== w.state) p.silenced = false;
  if (p.firstOut && old === "normal" && w.state === "alert" && !p.windows.some((x) => x.first)) w.first = true;
  if (w.state === "normal") w.first = false;
  return p;
}
function panelAction(panel, action) {
  const p = copy(panel);
  if (action === "silence") {
    p.silenced = true;
    return p;
  }
  for (const w of p.windows) {
    w.state = annunciatorTransition(w.state, w.active, action, p.sequence);
    if (w.state === "normal" || action === "reset") w.first = false;
  }
  return p;
}
function hornOn(panel) {
  return !panel.silenced && panel.windows.some((w) => w.state === "alert" || w.state === "ringback");
}

// js/src/contract/bars.ts
var BAR_LIMITS = ["normal_lo", "normal_hi", "lolo", "lo", "hi", "hihi"];
var opt = (v) => typeof v === "number" && Number.isFinite(v) ? v : null;
function normalizeBars(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  raw.forEach((item, i) => {
    let bar;
    if (typeof item === "string") bar = { label: item };
    else if (item && typeof item === "object" && !Array.isArray(item)) bar = item;
    else return;
    const clean = { label: "label" in bar && bar.label !== null && bar.label !== void 0 ? String(bar.label) : String(i + 1) };
    for (const key of BAR_LIMITS) clean[key] = opt(bar[key]);
    out.push(clean);
  });
  return out;
}
function barLevels(values, bars, deadband, previous) {
  return bars.map((bar, i) => {
    if (i >= values.length) return "normal";
    const prev = previous[i] ?? "normal";
    return computeAlarmLevel(values[i], { lolo: bar.lolo, lo: bar.lo, hi: bar.hi, hihi: bar.hihi, deadband, previous: prev });
  });
}

// js/src/core/scale.ts
function parseNumber(v) {
  if (typeof v === "number") return v;
  if (v === null || v === void 0) return NaN;
  if (v === "inf" || v === "Infinity") return Infinity;
  if (v === "-inf" || v === "-Infinity") return -Infinity;
  return Number(v);
}
function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}
function toFraction(v, min, max, scale = "linear") {
  if (scale === "log") {
    const lmin = Math.log10(min);
    return (Math.log10(v) - lmin) / (Math.log10(max) - lmin);
  }
  return (v - min) / (max - min);
}
function fromFraction(f, min, max, scale = "linear") {
  if (scale === "log") {
    const lmin = Math.log10(min);
    return 10 ** (lmin + f * (Math.log10(max) - lmin));
  }
  return min + f * (max - min);
}
function position(v, min, max, scale = "linear") {
  if (!Number.isFinite(v)) return { fraction: null, over: false, under: false, invalid: true };
  if (scale === "log" && v <= 0) return { fraction: 0, over: false, under: true, invalid: false };
  const f = toFraction(v, min, max, scale);
  return { fraction: clamp(f, 0, 1), over: f > 1, under: f < 0, invalid: false };
}
function snap(v, min, max, step) {
  let out = v;
  if (step > 0) out = min + Math.round((v - min) / step) * step;
  out = clamp(out, min, max);
  return Number(out.toPrecision(12));
}
function keyStep(min, max, step) {
  return step > 0 ? step : (max - min) / 100;
}
function ticks(min, max, count2 = 5, minor = 4, scale = "linear", { nice = true } = {}) {
  const n = Math.max(1, Math.round(count2));
  const m = Math.max(0, Math.round(minor));
  if (scale === "log") {
    const a = Math.log10(min);
    const b = Math.log10(max);
    if (Number.isInteger(a) && Number.isInteger(b) && b > a) {
      const major2 = [];
      const minorTicks2 = [];
      for (let e = a; e <= b; e++) {
        major2.push(10 ** e);
        if (e < b) for (let k = 2; k <= 9; k++) minorTicks2.push(k * 10 ** e);
      }
      return { major: major2, minor: minorTicks2 };
    }
  } else if (nice) {
    const major2 = niceTicks(min, max, n);
    if (major2.length >= 2) {
      const step = major2[1] - major2[0];
      const sub = step / (m + 1);
      const minorTicks2 = [];
      if (m > 0) {
        const eps = sub * 1e-6;
        for (let v = Math.ceil((min - eps) / sub) * sub; v <= max + eps; v += sub) {
          const r = Number(v.toPrecision(12));
          const onMajor = Math.abs(r / step - Math.round(r / step)) < 1e-6;
          if (!onMajor && r >= min - eps && r <= max + eps) minorTicks2.push(r);
        }
      }
      return { major: major2, minor: minorTicks2 };
    }
  }
  const major = [];
  const minorTicks = [];
  for (let i = 0; i <= n; i++) {
    major.push(fromFraction(i / n, min, max, scale));
    if (i < n) {
      for (let j = 1; j <= m; j++) {
        minorTicks.push(fromFraction((i + j / (m + 1)) / n, min, max, scale));
      }
    }
  }
  return { major, minor: minorTicks };
}
function polar(cx, cy, r, deg) {
  const a = deg * Math.PI / 180;
  return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
}
function linearHit(p, start, end) {
  return clamp((p - start) / (end - start), 0, 1);
}
function arcPath(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
function sectorPath(cx, cy, r0, r1, a0, a1) {
  const [x0, y0] = polar(cx, cy, r1, a0);
  const [x1, y1] = polar(cx, cy, r1, a1);
  const [x2, y2] = polar(cx, cy, r0, a1);
  const [x3, y3] = polar(cx, cy, r0, a0);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const f = (n) => n.toFixed(2);
  return `M${f(x0)} ${f(y0)}A${r1} ${r1} 0 ${large} 1 ${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}A${r0} ${r0} 0 ${large} 0 ${f(x3)} ${f(y3)}Z`;
}
function autoscale(current, dataMin, dataMax, { pad: pad5 = 0.05, shrinkBelow = 0.5 } = {}) {
  if (!Number.isFinite(dataMin) || !Number.isFinite(dataMax)) return current;
  let lo = dataMin;
  let hi = dataMax;
  if (hi === lo) {
    const d = Math.abs(hi) * 0.1 || 1;
    lo -= d;
    hi += d;
  }
  const span = hi - lo;
  const target = [lo - pad5 * span, hi + pad5 * span];
  const [cmin, cmax] = current;
  const outside = dataMin < cmin || dataMax > cmax;
  const tooWide = span < shrinkBelow * (cmax - cmin);
  return outside || tooWide ? target : current;
}
function niceTicks(min, max, count2 = 5) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return [min];
  const raw = (max - min) / Math.max(1, count2);
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const out = [];
  for (let v = Math.ceil(min / step - 1e-9) * step; v <= max + step * 1e-9; v += step) {
    out.push(Number((Math.abs(v) < step * 1e-9 ? 0 : v).toPrecision(12)));
  }
  return out;
}
function logFrac(y, [a, b]) {
  if (!(y > 0) || !(a > 0) || !(b > a)) return NaN;
  return Math.log10(y / a) / Math.log10(b / a);
}
function logAt([a, b], f) {
  return a * (b / a) ** f;
}
function logRange(lo, hi, auto = false) {
  if (!(hi > 0) || !Number.isFinite(hi)) return [1, 10];
  if (!(lo > 0) || !Number.isFinite(lo) || lo >= hi) lo = auto && lo > 0 ? lo / 10 : hi / 1e3;
  if (!auto) return [lo, hi];
  const a = 10 ** Math.floor(Math.log10(lo) + 1e-9);
  let b = 10 ** Math.ceil(Math.log10(hi) - 1e-9);
  if (b <= a) b = a * 10;
  return [Number(a.toPrecision(12)), Number(b.toPrecision(12))];
}
function logTicks(a, b) {
  if (!(a > 0) || !(b > a)) return [];
  const inRange = (v) => v >= a * (1 - 1e-9) && v <= b * (1 + 1e-9);
  const decades = [];
  for (let k = Math.ceil(Math.log10(a) - 1e-9); k <= Math.floor(Math.log10(b) + 1e-9); k++) decades.push(Number((10 ** k).toPrecision(12)));
  if (decades.length >= 2) return decades.length > 8 ? decades.filter((_, i) => i % Math.ceil(decades.length / 8) === 0) : decades;
  const out = [];
  for (let k = Math.floor(Math.log10(a)); k <= Math.ceil(Math.log10(b)); k++) {
    for (const m of [1, 2, 5]) {
      const v = Number((m * 10 ** k).toPrecision(12));
      if (inRange(v)) out.push(v);
    }
  }
  return out.length >= 2 ? out : niceTicks(a, b, 4).filter((v) => v > 0);
}

// js/src/contract/numeric.ts
function coerceValue(value, min, max, coerce) {
  return coerce && Number.isFinite(value) ? clamp(value, min, max) : value;
}
function validScale({ min, max, scale }) {
  return Number.isFinite(min) && Number.isFinite(max) && max > min && (scale !== "log" || min > 0);
}
var ScaleGuard = class {
  constructor(fallback = { min: 0, max: 100, scale: "linear" }) {
    this.warned = false;
    this.last = fallback;
  }
  resolve(s, where = "widget") {
    if (validScale(s)) {
      this.last = { ...s };
      this.warned = false;
      return this.last;
    }
    if (!this.warned) {
      this.warned = true;
      console.warn(`anywidget-instruments: ${where}: invalid scale (min ${s.min}, max ${s.max}, ${s.scale}); keeping min ${this.last.min}, max ${this.last.max}`);
    }
    return this.last;
  }
};
function normalizeValueLabels(raw) {
  const out = [];
  for (const item of Array.isArray(raw) ? raw : []) {
    const it = item && typeof item === "object" ? item : {};
    if (typeof it.value !== "number" || !Number.isFinite(it.value) || typeof it.label !== "string" || !it.label.trim()) continue;
    if (out.some((o) => o.value === it.value)) continue;
    out.push({ value: it.value, label: it.label });
  }
  return out.sort((a, b) => a.value - b.value);
}
function valueLabelOf(labels, value, lo, hi) {
  if (!Number.isFinite(value)) return null;
  const tol = 1e-9 * Math.max(1, Math.abs(hi - lo));
  for (const it of labels) if (Math.abs(it.value - value) <= tol) return it.label;
  return null;
}
function valueOfLabel(labels, text) {
  const key = text.trim().toLowerCase();
  for (const it of labels) if (it.label.trim().toLowerCase() === key) return it.value;
  return null;
}

// js/src/contract/peak.ts
function nextPeak(value, state, { hold, decay, now }) {
  if (!hold || !Number.isFinite(value)) return null;
  const expired = decay > 0 && now - state.time > decay;
  if (state.peak === null || value >= state.peak || expired) return { peak: value, time: now };
  return null;
}

// js/src/contract/pid.ts
var clamp2 = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
function spLimits(s) {
  return [s.sp_min ?? s.pv_min, s.sp_max ?? s.pv_max];
}
function clampedSpOp(s) {
  const [lo, hi] = spLimits(s);
  return { sp: clamp2(s.sp, lo, hi), op: clamp2(s.op, s.op_min, s.op_max) };
}
var EDITABLE_IN = { sp: "AUTO", op: "MAN" };
function operatorSet(s, field, value, confirmed = false) {
  if (!(field in EDITABLE_IN)) return { ok: false, reason: `unknown field '${field}'` };
  if (s.loop_mode !== EDITABLE_IN[field]) return { ok: false, reason: `${field.toUpperCase()} can only be changed in ${EDITABLE_IN[field]} mode` };
  const v = typeof value === "number" ? value : typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;
  if (!Number.isFinite(v)) return { ok: false, reason: "not a number" };
  const [lo, hi] = field === "sp" ? spLimits(s) : [s.op_min, s.op_max];
  const next = clamp2(v, lo, hi);
  const old = field === "sp" ? s.sp : s.op;
  if (s.confirm_delta !== null && Math.abs(next - old) > s.confirm_delta && !confirmed) return { ok: false, reason: "confirmation required" };
  return { ok: true, field, value: next };
}
function loopModeChange(s, mode) {
  if (!s.modes.includes(mode)) return { ok: false, reason: `mode '${mode}' is not enabled` };
  const changes = { loop_mode: mode };
  if (s.loop_mode === "MAN" && mode !== "MAN" && s.sp_tracking && Number.isFinite(s.pv)) {
    const [lo, hi] = spLimits(s);
    changes.sp = clamp2(s.pv, lo, hi);
  }
  return { ok: true, changes };
}

// js/src/contract/statemachine.ts
var SC = "SC";
var isNum = (v) => typeof v === "number" && Number.isFinite(v);
function drawingOf(m, names, commands) {
  const out = {};
  if ("zones" in m) {
    if (!Array.isArray(m.zones)) return null;
    const zones = [];
    for (const z of m.zones) {
      if (!z || typeof z !== "object") return null;
      const zr = z;
      if (!Array.isArray(zr.rects) || !zr.rects.length || !zr.rects.every((r) => Array.isArray(r) && r.length === 4 && r.every(isNum))) return null;
      const zone = { rects: zr.rects.map((r) => [...r]) };
      if ("label" in zr) {
        if (typeof zr.label !== "string") return null;
        zone.label = zr.label;
      }
      if ("commands" in zr) {
        if (!Array.isArray(zr.commands) || zr.commands.some((c) => !commands.includes(c))) return null;
        zone.commands = zr.commands.map(String);
      }
      if ("shade" in zr) zone.shade = !!zr.shade;
      zones.push(zone);
    }
    out.zones = zones;
  }
  if ("routes" in m) {
    if (!m.routes || typeof m.routes !== "object" || Array.isArray(m.routes)) return null;
    const routes = {};
    for (const [key, pts] of Object.entries(m.routes)) {
      const ends = key.split(">");
      if (ends.length !== 2 || !ends.every((n) => names.includes(n))) return null;
      if (!Array.isArray(pts) || !pts.every((p) => Array.isArray(p) && p.length === 2 && p.every(isNum))) return null;
      routes[key] = pts.map((p) => [p[0], p[1]]);
    }
    out.routes = routes;
  }
  return out;
}
function normalizeMachine(raw) {
  if (!raw || typeof raw !== "object") return null;
  const m = raw;
  if (!Array.isArray(m.states) || m.states.length === 0) return null;
  const states = [];
  for (const [k, s] of m.states.entries()) {
    if (!s || typeof s !== "object" || typeof s.name !== "string") return null;
    const st = s;
    const state = { name: st.name, x: "x" in st ? Number(st.x) : k % 5, y: "y" in st ? Number(st.y) : Math.floor(k / 5), acting: "acting" in st ? !!st.acting : false };
    for (const key of ["title", "group"]) {
      if (!(key in st)) continue;
      if (typeof st[key] !== "string") return null;
      state[key] = st[key];
    }
    states.push(state);
  }
  const names = states.map((s) => s.name);
  if (new Set(names).size !== names.length) return null;
  const commands = Array.isArray(m.commands) ? m.commands.map(String) : [];
  const transitions = [];
  for (const tr of Array.isArray(m.transitions) ? m.transitions : []) {
    if (!Array.isArray(tr) || tr.length !== 3 || !names.includes(tr[0]) || !names.includes(tr[2])) return null;
    transitions.push([String(tr[0]), String(tr[1]), String(tr[2])]);
    if (tr[1] !== SC && !commands.includes(String(tr[1]))) commands.push(String(tr[1]));
  }
  const initial = "initial" in m ? m.initial : names[0];
  if (typeof initial !== "string" || !names.includes(initial)) return null;
  const machine = { states, transitions, commands, initial };
  if ("global_commands" in m) {
    const global = Array.isArray(m.global_commands) ? m.global_commands.map(String) : null;
    if (!global || global.some((c) => !commands.includes(c))) return null;
    machine.global_commands = global;
  }
  const drawing = drawingOf(m, names, commands);
  if (!drawing) return null;
  return { ...machine, ...drawing };
}
function nextState(machine, state, command) {
  const tr = machine.transitions.find(([from, cmd]) => from === state && cmd === command);
  return tr ? tr[2] : null;
}
function availableCommands(machine, state) {
  return machine.commands.filter((c) => nextState(machine, state, c) !== null);
}
function globalCommands(machine) {
  return machine.global_commands ?? ["Stop", "Abort"];
}
function resolveState(machine, value) {
  return typeof value === "string" && machine.states.some((s) => s.name === value) ? value : machine.initial;
}

// js/src/contract/traits.ts
var NONFINITE = /* @__PURE__ */ new Set(["nan", "inf", "-inf", "NaN", "Infinity", "-Infinity"]);
var isPlainObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
function readNumber(spec, raw) {
  let v;
  if (typeof raw === "number") v = raw;
  else if (spec.nonfinite && typeof raw === "string" && NONFINITE.has(raw)) v = parseNumber(raw);
  else return void 0;
  if (!Number.isFinite(v)) return spec.nonfinite ? v : void 0;
  if (spec.modulo) v = (v % spec.modulo + spec.modulo) % spec.modulo;
  if (spec.type === "integer") v = Math.round(v);
  if (spec.exclusiveMinimum !== void 0 && v <= spec.exclusiveMinimum) return void 0;
  if (spec.exclusiveMaximum !== void 0 && v >= spec.exclusiveMaximum) return void 0;
  if (spec.minimum !== void 0 && v < spec.minimum) v = spec.minimum;
  if (spec.maximum !== void 0 && v > spec.maximum) v = spec.maximum;
  return v;
}
function readBytes(raw) {
  if (raw instanceof ArrayBuffer) return new Uint8Array(raw);
  if (ArrayBuffer.isView(raw)) return new Uint8Array(raw.buffer, raw.byteOffset, raw.byteLength);
  if (typeof raw !== "string") return void 0;
  try {
    return Uint8Array.from(atob(raw), (c) => c.charCodeAt(0));
  } catch {
    return void 0;
  }
}
function readValue(spec, raw) {
  if (raw === null) return spec.nullable ? null : void 0;
  switch (spec.type) {
    case "number":
    case "integer":
      return readNumber(spec, raw);
    case "string":
      return typeof raw === "string" ? raw : void 0;
    case "boolean":
      return typeof raw === "boolean" ? raw : void 0;
    case "enum":
    case "const":
      return spec.values?.includes(raw) ? raw : void 0;
    case "array": {
      if (!Array.isArray(raw)) return void 0;
      if (spec.prefixItems) {
        if (raw.length !== spec.prefixItems.length) return void 0;
        const out2 = spec.prefixItems.map((s, i) => readValue(s, raw[i]));
        return out2.includes(void 0) ? void 0 : out2;
      }
      let out = raw;
      if (spec.items) {
        const items = spec.items;
        const read = raw.map((x) => readValue(items, x));
        out = spec.itemDefault !== void 0 ? read.map((x) => x === void 0 ? spec.itemDefault : x) : read.filter((x) => x !== void 0);
      }
      if (spec.minItems !== void 0 && out.length < spec.minItems) return void 0;
      if (spec.maxItems !== void 0 && out.length > spec.maxItems) return void 0;
      if (spec.uniqueItems && new Set(out.map((x) => JSON.stringify(x))).size !== out.length) return void 0;
      return out;
    }
    case "bytes":
      return readBytes(raw);
    case "object": {
      if (!isPlainObject(raw)) return void 0;
      if (!spec.keys) return raw;
      const keys = spec.keys;
      return Object.fromEntries(Object.entries(raw).filter(([k, v]) => keys.includes(k) && typeof v === "string"));
    }
    default:
      return raw;
  }
}
function defaultOf(spec) {
  const v = readValue(spec, spec.default);
  return v === void 0 ? spec.default : v;
}
function readTrait(spec, raw, onInvalid) {
  if (raw === void 0) return defaultOf(spec);
  const v = readValue(spec, raw);
  if (v !== void 0) return v;
  onInvalid?.();
  return defaultOf(spec);
}

// js/src/contract/derived.ts
function hostOwnsState(model) {
  const s = model.get("_session");
  return typeof s === "string" && s !== "";
}
function contractOf(model) {
  const kind = model.get("_kind");
  return typeof kind === "string" ? BY_KIND[kind] : void 0;
}
function reader(model, contract) {
  return (name) => {
    const spec = contract.traits[name];
    return spec ? readTrait(spec, model.get(name)) : model.get(name);
  };
}
function attachAlarmLevel(model, contract) {
  const read = reader(model, contract);
  const num2 = (name) => read(name);
  const source = contract.traits.alarm_level.source ?? "value";
  const hasCoerce = "coerce" in contract.traits;
  const ALARM_INPUTS = [source, "min", "max", "coerce", "lolo", "lo", "hi", "hihi", "deadband", "alarm_level", "_session"];
  let previous = read("alarm_level");
  let hostLevel = false;
  let writing = false;
  const update = () => {
    if (writing) return;
    if (hostOwnsState(model)) {
      hostLevel = true;
      return;
    }
    if (hostLevel) {
      previous = read("alarm_level");
      hostLevel = false;
    }
    const raw = num2(source);
    const value = hasCoerce ? coerceValue(raw, num2("min"), num2("max"), !!read("coerce")) : raw;
    const level = computeAlarmLevel(value, { lolo: num2("lolo"), lo: num2("lo"), hi: num2("hi"), hihi: num2("hihi"), deadband: num2("deadband") ?? 0, previous });
    previous = level;
    if (model.get("alarm_level") !== level) {
      writing = true;
      try {
        model.set("alarm_level", level);
        model.save_changes();
      } finally {
        writing = false;
      }
    }
  };
  for (const name of ALARM_INPUTS) model.on(`change:${name}`, update);
  update();
  return () => {
    for (const name of ALARM_INPUTS) model.off(`change:${name}`, update);
  };
}
var monotonic = () => (typeof performance !== "undefined" ? performance.now() : Date.now()) / 1e3;
function attachPeak(model, contract, clock) {
  const read = reader(model, contract);
  const num2 = (name) => read(name);
  const state = { peak: read("peak"), time: 0 };
  let writing = false;
  const onValue = () => {
    if (hostOwnsState(model)) return;
    const value = coerceValue(num2("value"), num2("min"), num2("max"), !!read("coerce"));
    const next = nextPeak(value, state, { hold: !!read("peak_hold"), decay: num2("peak_decay") || 0, now: clock() });
    if (!next) return;
    Object.assign(state, next);
    writing = true;
    try {
      model.set("peak", next.peak);
      model.save_changes();
    } finally {
      writing = false;
    }
  };
  const onPeak = () => {
    if (!writing) state.peak = read("peak");
  };
  model.on("change:value", onValue);
  model.on("change:peak", onPeak);
  return () => {
    model.off("change:value", onValue);
    model.off("change:peak", onPeak);
  };
}
var BAR_INPUTS = ["value", "bars", "deadband", "alarm_levels", "_session"];
function attachBarLevels(model, contract) {
  const read = reader(model, contract);
  let previous = read("alarm_levels") || [];
  let writing = false;
  const update = () => {
    if (writing) return;
    if (hostOwnsState(model)) {
      previous = read("alarm_levels") || [];
      return;
    }
    const levels = barLevels(read("value"), normalizeBars(read("bars")), Number(read("deadband")) || 0, previous);
    previous = levels;
    if (JSON.stringify(model.get("alarm_levels")) !== JSON.stringify(levels)) {
      writing = true;
      try {
        model.set("alarm_levels", levels);
        model.save_changes();
      } finally {
        writing = false;
      }
    }
  };
  for (const name of BAR_INPUTS) model.on(`change:${name}`, update);
  update();
  return () => {
    for (const name of BAR_INPUTS) model.off(`change:${name}`, update);
  };
}
function machineOf(model, contract) {
  return normalizeMachine(model.get("machine")) ?? normalizeMachine(contract.traits.machine.default);
}
function attachStateMachine(model, contract) {
  const inputs = ["machine", "value", "_session"];
  let writing = false;
  const update = () => {
    if (writing || hostOwnsState(model)) return;
    const m = machineOf(model, contract);
    const state = resolveState(m, model.get("value"));
    const available = availableCommands(m, state);
    const changes = {};
    if (model.get("value") !== state) changes.value = state;
    if (JSON.stringify(model.get("available_commands")) !== JSON.stringify(available)) changes.available_commands = available;
    if (Object.keys(changes).length === 0) return;
    writing = true;
    try {
      for (const [k, v] of Object.entries(changes)) model.set(k, v);
      model.save_changes();
    } finally {
      writing = false;
    }
  };
  for (const name of inputs) model.on(`change:${name}`, update);
  update();
  return () => {
    for (const name of inputs) model.off(`change:${name}`, update);
  };
}
function attachPidSummary(model, contract) {
  const read = reader(model, contract);
  const inputs = ["pv", "sp", "op", "loop_mode", "sp_min", "sp_max", "pv_min", "pv_max", "op_min", "op_max", "_session"];
  let writing = false;
  const update = () => {
    if (writing || hostOwnsState(model)) return;
    const { sp, op } = pidState(read);
    const pv = read("pv");
    const summary = { pv: Number.isFinite(pv) ? pv : String(pv).toLowerCase().replace("infinity", "inf"), sp, op, mode: read("loop_mode") };
    if (JSON.stringify(model.get("value")) === JSON.stringify(summary)) return;
    writing = true;
    try {
      model.set("value", summary);
      model.save_changes();
    } finally {
      writing = false;
    }
  };
  for (const name of inputs) model.on(`change:${name}`, update);
  update();
  return () => {
    for (const name of inputs) model.off(`change:${name}`, update);
  };
}
function pidState(read) {
  const n = (k) => read(k);
  const o = (k) => read(k);
  const s = {
    pv: n("pv"),
    sp: n("sp"),
    op: n("op"),
    loop_mode: String(read("loop_mode")),
    modes: read("modes") || [],
    pv_min: n("pv_min"),
    pv_max: n("pv_max"),
    sp_min: o("sp_min"),
    sp_max: o("sp_max"),
    op_min: n("op_min"),
    op_max: n("op_max"),
    confirm_delta: o("confirm_delta"),
    sp_tracking: !!read("sp_tracking")
  };
  return { ...s, ...clampedSpOp(s) };
}
var PANELS = /* @__PURE__ */ new WeakMap();
function panelOf(model, read) {
  const reg = PANELS.get(model);
  return { windows: normalizeWindows(read("value")), sequence: read("sequence"), firstOut: !!read("first_out"), silenced: !!reg?.silenced };
}
function writePanel(model, p) {
  const reg = PANELS.get(model);
  if (reg) {
    reg.silenced = p.silenced;
    reg.active = new Map(p.windows.map((w) => [w.tag, w.active]));
  }
  const horn = hornOn(p);
  if (JSON.stringify(model.get("value")) === JSON.stringify(p.windows) && model.get("horn") === horn) return;
  model.set("value", p.windows);
  model.set("horn", horn);
  model.save_changes();
}
function annunciatorAction(model, action) {
  const contract = contractOf(model);
  if (!contract || hostOwnsState(model)) return false;
  writePanel(model, panelAction(panelOf(model, reader(model, contract)), action));
  return true;
}
function attachAnnunciator(model, contract) {
  const read = reader(model, contract);
  const initial = normalizeWindows(read("value"));
  const sounding = initial.some((w) => w.state === "alert" || w.state === "ringback");
  PANELS.set(model, { silenced: sounding && !read("horn"), active: new Map(initial.map((w) => [w.tag, w.active && w.state !== "normal"])) });
  let writing = false;
  const guarded = (f) => () => {
    if (writing || hostOwnsState(model)) return;
    writing = true;
    try {
      f();
    } finally {
      writing = false;
    }
  };
  const onValue = guarded(() => {
    const reg = PANELS.get(model);
    let p = panelOf(model, read);
    for (const w of p.windows) {
      const before = reg.active.get(w.tag) ?? false;
      if (before !== w.active) {
        w.active = before;
        p = setProcess(p, w.tag, !before);
      }
    }
    writePanel(model, p);
  });
  const onSequence = guarded(() => {
    const p = panelOf(model, read);
    for (const w of p.windows) {
      w.state = w.active ? "alert" : "normal";
      w.first = false;
    }
    writePanel(model, p);
  });
  model.on("change:value", onValue);
  model.on("change:sequence", onSequence);
  onValue();
  return () => {
    model.off("change:value", onValue);
    model.off("change:sequence", onSequence);
  };
}
function writeRows(model, rows) {
  if (JSON.stringify(model.get("value")) === JSON.stringify(rows)) return;
  model.set("value", rows);
  model.save_changes();
}
function alarmAction(model, msg, now = Date.now()) {
  const contract = contractOf(model);
  if (!contract || hostOwnsState(model)) return;
  const list = contract.className === "AlarmList";
  const table = BY_KIND.alarmindicator?.traits.value.transitions;
  const rows = (model.get("value") || []).map((r) => ({ ...r }));
  let next = rows;
  if (msg.type === "ack") next = acknowledgeRows(rows, String(msg.alarm_id), table, list);
  else if (msg.type === "ack_all") next = acknowledgeRows(rows, null, table, list);
  else if (msg.type === "shelve") next = shelveRow(rows, String(msg.alarm_id), Number(msg.seconds), Number(reader(model, contract)("max_shelve")), now);
  else if (msg.type === "unshelve") next = unshelveRow(rows, String(msg.alarm_id));
  if (next) writeRows(model, next);
}
function attachShelvingExpiry(model) {
  let timer = null;
  const arm = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    if (hostOwnsState(model)) return;
    const t = nextExpiry(model.get("value") || []);
    if (t === null) return;
    timer = setTimeout(() => {
      timer = null;
      writeRows(model, expireShelving(model.get("value") || [], Date.now()).rows);
      arm();
    }, Math.max(0, t - Date.now()) + 50);
  };
  model.on("change:value", arm);
  arm();
  return () => {
    if (timer) clearTimeout(timer);
    model.off("change:value", arm);
  };
}
function attachDerived(model, { clock = monotonic } = {}) {
  const contract = contractOf(model);
  const cleanups = [];
  if (contract?.traits.alarm_level?.writer === "derived") cleanups.push(attachAlarmLevel(model, contract));
  if (contract?.traits.peak?.writer === "derived") cleanups.push(attachPeak(model, contract, clock));
  if (contract?.traits.alarm_levels?.writer === "derived") cleanups.push(attachBarLevels(model, contract));
  if (contract?.traits.available_commands?.writer === "derived") cleanups.push(attachStateMachine(model, contract));
  if (contract?.traits.loop_mode && contract.traits.value?.writer === "derived") cleanups.push(attachPidSummary(model, contract));
  if (contract?.traits.horn?.writer === "derived") cleanups.push(attachAnnunciator(model, contract));
  if (contract?.traits.max_shelve) cleanups.push(attachShelvingExpiry(model));
  return () => cleanups.forEach((c) => c());
}

// js/src/core/liveness.ts
var scope = globalThis;
var REG = scope.__awiLiveness || (scope.__awiLiveness = { beats: {} });
function recordBeat(session, now = Date.now()) {
  if (typeof session === "string" && session) REG.beats[session] = now;
}
function markDead(session) {
  if (typeof session === "string" && session) REG.beats[session] = -Infinity;
}
function announcedInterval(session, interval) {
  if (typeof session !== "string" || !session) return 0;
  const s = parseNumber(interval);
  return Number.isFinite(s) && s > 0 ? s : 0;
}
function liveness({ session, interval, since, now = Date.now() }) {
  const period = announcedInterval(session, interval);
  if (!period) return "live";
  const limit = (3 * period + 1) * 1e3;
  const last = REG.beats[session];
  if (last === void 0) return now - since > limit + 2e3 ? "nokernel" : "live";
  return now - last > limit ? "stale" : "live";
}
function watchModel(model) {
  model.on("msg:custom", (msg) => {
    if (msg && msg.type === "hb") recordBeat(msg.session);
  });
  model.on("comm_live_update", () => markDead(model.get("_session")));
}

// js/src/core/dom.ts
var SVG_NS = "http://www.w3.org/2000/svg";
function svg(tag, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, tag);
  setAttrs(node, attrs);
  for (const c of children) if (c) node.appendChild(c);
  return node;
}
function html(tag, { cls, text, attrs } = {}, children = []) {
  const node = document.createElement(tag);
  if (tag === "button") node.setAttribute("data-lm-suppress-shortcuts", "true");
  if (cls) node.className = cls;
  if (text !== void 0) node.textContent = text;
  if (attrs) setAttrs(node, attrs);
  for (const c of children) if (c) node.appendChild(c);
  return node;
}
function setAttrs(node, attrs) {
  for (const [k, v] of Object.entries(attrs)) setAttr(node, k, v === null || v === void 0 || v === false ? null : String(v));
}
function setAttr(node, name, value) {
  if (value === null) {
    if (node.hasAttribute(name)) node.removeAttribute(name);
  } else if (node.getAttribute(name) !== value) node.setAttribute(name, value);
}
function setText(node, text) {
  if (node.textContent !== text) node.textContent = text;
}
function setHidden(node, hidden) {
  if (node.hidden !== hidden) node.hidden = hidden;
}
function svgText(content, attrs = {}) {
  const node = svg("text", attrs);
  node.textContent = content;
  return node;
}
function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}
function safeColor(c) {
  return typeof c === "string" && /^[#a-zA-Z0-9(),.%\s-]{1,64}$/.test(c) && !/url/i.test(c) ? c : "";
}
var FORBIDDEN = /* @__PURE__ */ new Set(["script", "foreignobject", "iframe", "object", "embed", "audio", "video"]);
function parseSkin(source) {
  if (typeof source !== "string" || !source) return null;
  const doc = new DOMParser().parseFromString(source, "image/svg+xml");
  const root = doc.documentElement;
  if (!root || root.nodeName.toLowerCase() !== "svg" || doc.querySelector("parsererror")) return null;
  const walk = (el) => {
    for (const child of Array.from(el.children)) {
      if (FORBIDDEN.has(child.nodeName.toLowerCase())) child.remove();
      else walk(child);
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();
      if (name.startsWith("on")) el.removeAttribute(attr.name);
      else if ((name === "href" || name.endsWith(":href") || name === "src") && !(value.startsWith("#") || value.startsWith("data:image/png") || value.startsWith("data:image/jpeg"))) {
        el.removeAttribute(attr.name);
      } else if (/url\(\s*['"]?\s*[^#'"\s]/.test(value)) el.removeAttribute(attr.name);
    }
  };
  walk(root);
  return document.importNode(root, true);
}

// js/src/core/pagetheme.ts
var DARK_HOST = '[data-jp-theme-light="false"], .vscode-dark, .vscode-high-contrast, [data-theme="dark"], .dark-mode, .dark-theme';
var LIGHT_HOST = '[data-jp-theme-light="true"], .vscode-light, [data-theme="light"], .light-theme';
var osDark = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
function hostIsDark(el) {
  let node = el;
  while (node) {
    if (node.nodeType === 1) {
      if (node.matches(DARK_HOST)) return true;
      if (node.matches(LIGHT_HOST)) return false;
    }
    node = node.parentNode || node.host || null;
  }
  return osDark();
}
function applyPageTheme(doc, theme) {
  const body = doc && doc.body;
  if (!body) return false;
  const cl = body.classList;
  if (!cl.contains("light-theme") && !cl.contains("dark-theme")) return false;
  const dark = theme === "system" ? osDark() : theme === "dark";
  const [from, to] = dark ? ["light", "dark"] : ["dark", "light"];
  cl.remove(from, `${from}-theme`);
  cl.add(to, `${to}-theme`);
  body.dataset.theme = to;
  return true;
}

// js/src/core/view.ts
var COMMON_TRAITS = ["mode", "label", "disabled", "visible", "tooltip", "size", "style", "theme", "skin", "_heartbeat"];
var STALE_TEXT = {
  live: "",
  stale: "⚠ STALE — kernel lost",
  nokernel: "⚠ NO KERNEL — read-only"
};
var uid = 0;
var prefix = `awi${Math.random().toString(36).slice(2, 8)}`;
var BaseView = class {
  /**
   * @param model anywidget model (AFM interface)
   * @param el host element
   * @param traits widget-specific traits triggering a redraw
   */
  constructor(model, el, traits = []) {
    this._invalid = /* @__PURE__ */ new Set();
    /** Last read of each trait: the value is read again only when the raw value changes. */
    this._reads = /* @__PURE__ */ new Map();
    this.model = model;
    this.el = el;
    this.id = `${prefix}-${++uid}`;
    this.kind = String(model.get("_kind") ?? "");
    this.contract = BY_KIND[this.kind];
    this._frame = 0;
    this._dirty = true;
    this._inViewport = true;
    this._disposers = [];
    this._lastSend = 0;
    this._pendingSend = null;
    this.root = html("div", { cls: `awi-root awi-${this.kind}`, attrs: { "data-lm-suppress-shortcuts": "true" } });
    this.labelEl = html("div", { cls: "awi-label", attrs: { id: `${this.id}-label` } });
    this.body = html("div", { cls: "awi-body", attrs: { "data-lm-suppress-shortcuts": "true" } });
    this.staleBadge = html("div", { cls: "awi-stale-badge", attrs: { role: "status" } });
    this.staleBadge.hidden = true;
    this.root.append(this.labelEl, this.body, this.staleBadge);
    el.appendChild(this.root);
    this.stale = "live";
    this._since = Date.now();
    this.listen("msg:custom", (msg) => {
      if (msg && msg.type === "hb") {
        recordBeat(msg.session);
        this.checkLiveness();
      }
    });
    const timer = setInterval(() => this.checkLiveness(), 1e3);
    this._disposers.push(() => clearInterval(timer));
    for (const name of /* @__PURE__ */ new Set([...COMMON_TRAITS, ...traits])) {
      this.listen(`change:${name}`, () => this.schedule());
    }
    if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver((entries) => {
        this._inViewport = entries.some((e) => e.isIntersecting);
        if (this._inViewport && this._dirty) this.schedule();
      });
      io.observe(this.root);
      this._disposers.push(() => io.disconnect());
    }
    if (typeof matchMedia !== "undefined") {
      const mq = matchMedia("(prefers-color-scheme: dark)");
      const cb = () => this.schedule();
      mq.addEventListener?.("change", cb);
      this._disposers.push(() => mq.removeEventListener?.("change", cb));
    }
  }
  listen(event, cb) {
    this.model.on(event, cb);
    this._disposers.push(() => this.model.off(event, cb));
  }
  get(name) {
    const raw = this.model.get(name);
    const spec = this.contract?.traits[name];
    if (!spec) return raw;
    const last = this._reads.get(name);
    if (last && Object.is(last.raw, raw)) return last.value;
    const value = readTrait(spec, raw, () => {
      if (this._invalid.has(name)) return;
      this._invalid.add(name);
      console.warn(`anywidget-instruments: ${this.kind}.${name}: invalid value ${JSON.stringify(raw)}, using the default`);
    });
    this._reads.set(name, { raw, value });
    return value;
  }
  /** True when user input may modify the value (API-004, API-011). */
  get interactive() {
    return this.get("mode") === "control" && !this.get("disabled") && !!this.get("visible") && this.stale === "live";
  }
  checkLiveness() {
    const state = liveness({ session: this.get("_session"), interval: this.get("_heartbeat"), since: this._since });
    if (state !== this.stale) {
      this.stale = state;
      this.schedule();
    }
  }
  /** PERF-003: coalesce updates, render at most once per animation frame. */
  schedule() {
    this._dirty = true;
    if (!this._inViewport) {
      this.renderCommon();
      return;
    }
    if (this._frame) return;
    const raf = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : (f) => setTimeout(f, 16);
    this._frame = raf(() => {
      this._frame = 0;
      if (!this._dirty) return;
      this._dirty = false;
      this.renderCommon();
      this.draw();
    });
  }
  renderCommon() {
    const r = this.root;
    const [w, h] = this.get("size") || [160, 160];
    r.classList.toggle("awi-indicator", this.get("mode") === "indicator");
    r.classList.toggle("awi-control", this.get("mode") === "control");
    r.classList.toggle("awi-disabled", !!this.get("disabled"));
    for (const s of ["modern", "classic", "system"]) r.classList.toggle(`awi-style-${s}`, this.get("style") === s);
    let theme = this.get("theme");
    if (theme === "system") theme = hostIsDark(this.el) ? "dark" : "light";
    for (const t of ["light", "dark"]) r.classList.toggle(`awi-theme-${t}`, theme === t);
    r.style.display = this.get("visible") ? "" : "none";
    r.style.setProperty("--awi-w", `${w}px`);
    r.style.setProperty("--awi-h", `${h}px`);
    this.body.style.width = `${w}px`;
    this.body.style.height = `${h}px`;
    const tip = this.get("tooltip");
    setAttr(r, "title", tip || null);
    const label = String(this.get("label") || "");
    setText(this.labelEl, label);
    setHidden(this.labelEl, !label);
    r.classList.toggle("awi-stale", this.stale !== "live");
    setHidden(this.staleBadge, this.stale === "live");
    setText(this.staleBadge, STALE_TEXT[this.stale]);
    setAttr(r, "aria-disabled", this.get("disabled") || this.stale !== "live" ? "true" : null);
  }
  /** Subclasses draw their content here. */
  draw() {
  }
  /** Set a CSS custom property from a trait color, if it is a safe color. */
  setColorVar(name, value) {
    const c = safeColor(value);
    if (c) this.root.style.setProperty(name, c);
    else this.root.style.removeProperty(name);
  }
  /**
   * Send a new value to the kernel (API-006). Intermediate values are rate
   * limited by `update_rate` (NUM-009); `final` values are always sent.
   */
  sendValue(value, final = false) {
    if (this.stale !== "live") return;
    const rate = Number(this.get("update_rate")) || 30;
    const now = Date.now();
    const interval = 1e3 / rate;
    const flush = () => {
      this._pendingSend = null;
      this._lastSend = Date.now();
      this.model.set("value", this._pendingValue);
      this.model.save_changes();
    };
    this._pendingValue = value;
    if (final || now - this._lastSend >= interval) {
      if (this._pendingSend) clearTimeout(this._pendingSend);
      flush();
    } else if (!this._pendingSend) {
      this._pendingSend = setTimeout(flush, interval - (now - this._lastSend));
    }
  }
  destroy() {
    if (this._frame && typeof cancelAnimationFrame !== "undefined") cancelAnimationFrame(this._frame);
    if (this._pendingSend) clearTimeout(this._pendingSend);
    for (const d of this._disposers) d();
    this.root.remove();
  }
};

// js/src/widgets/alarm.ts
var STATE_TEXT = {
  normal: "NORMAL",
  active_unacknowledged: "ACTIVE · UNACK",
  active_acknowledged: "ACTIVE · ACK",
  cleared_unacknowledged: "CLEARED · UNACK"
};
var PRIORITY_TEXT = { low: "P4", medium: "P3", high: "P2", critical: "P1" };
function priorityShape(priority) {
  switch (priority) {
    case "critical":
      return svg("path", { class: "awi-alarm-shape", d: "M12 1L23 12L12 23L1 12Z" });
    // diamond
    case "high":
      return svg("path", { class: "awi-alarm-shape", d: "M12 1L23 22H1Z" });
    // triangle
    case "medium":
      return svg("rect", { class: "awi-alarm-shape", x: 2, y: 2, width: 20, height: 20, rx: 2 });
    // square
    default:
      return svg("circle", { class: "awi-alarm-shape", cx: 12, cy: 12, r: 10 });
  }
}
var AlarmView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "priority", "message", "alarm_id"]);
    this.icon = svg("svg", { class: "awi-alarm-icon", viewBox: "0 0 24 24", "aria-hidden": "true" });
    this.text = html("div", { cls: "awi-alarm-text" });
    this.stateEl = html("div", { cls: "awi-alarm-state" });
    this.msgEl = html("div", { cls: "awi-alarm-msg" });
    this.text.append(this.stateEl, this.msgEl);
    this.ack = html("button", { cls: "awi-ack", text: "ACK", attrs: { type: "button" } });
    this.ack.addEventListener("click", () => this.acknowledge());
    this.body.append(this.icon, this.text, this.ack);
    this.body.setAttribute("role", "status");
    this.schedule();
  }
  /**
   * Operator acknowledgement (SCADA-007): always reported to the host; applied
   * by the front end itself when no host owns the state (HOST-004).
   */
  acknowledge() {
    if (!this.interactive) return;
    this.model.send({ type: "ack" });
    if (hostOwnsState(this.model)) return;
    const next = applyTransition(this.contract?.traits.value.transitions, this.get("value"), "acknowledge");
    if (next === this.get("value")) return;
    this.model.set("value", next);
    this.model.save_changes();
  }
  draw() {
    const state = this.get("value");
    const priority = this.get("priority");
    const r = this.root;
    for (const s of Object.keys(STATE_TEXT)) r.classList.toggle(`awi-state-${s}`, s === state);
    for (const p of Object.keys(PRIORITY_TEXT)) r.classList.toggle(`awi-prio-${p}`, p === priority);
    while (this.icon.firstChild) this.icon.removeChild(this.icon.firstChild);
    this.icon.appendChild(priorityShape(priority));
    this.stateEl.textContent = `${PRIORITY_TEXT[priority] || ""} ${STATE_TEXT[state] || state}`;
    const id = this.get("alarm_id");
    const msg = this.get("message");
    this.msgEl.textContent = id && msg ? `${id}: ${msg}` : id || msg;
    const unack = state === "active_unacknowledged" || state === "cleared_unacknowledged";
    this.ack.hidden = !(unack && this.get("mode") === "control");
    this.ack.disabled = !!this.get("disabled");
    this.body.setAttribute("aria-label", `${this.get("label") || "Alarm"} ${this.stateEl.textContent} ${this.msgEl.textContent}`.trim());
  }
};

// js/src/widgets/alarmlist.ts
var RANK = { critical: 0, high: 1, medium: 2, low: 3 };
var PRIORITY_TEXT2 = { critical: "P1", high: "P2", medium: "P3", low: "P4" };
var STATE_TEXT2 = { active_unacknowledged: "ACTIVE · UNACK", active_acknowledged: "ACTIVE · ACK", cleared_unacknowledged: "CLEARED · UNACK", normal: "NORMAL" };
var VIEWS = { active: "Active", unack: "Unacknowledged", shelved: "Shelved", suppressed: "Suppressed / out of service", all: "All" };
function category(a) {
  if (a.out_of_service || a.suppressed) return "suppressed";
  if (a.shelved_until) return "shelved";
  return "active";
}
function filterAlarms(alarms, { view = "active", priority = "all", text = "", sort = "priority" } = {}) {
  const needle = text.trim().toLowerCase();
  const out = alarms.filter((a) => {
    const cat = category(a);
    if (view === "active" && (cat !== "active" || a.state === "normal")) return false;
    if (view === "unack" && (cat !== "active" || !String(a.state).includes("unacknowledged"))) return false;
    if (view === "shelved" && cat !== "shelved") return false;
    if (view === "suppressed" && cat !== "suppressed") return false;
    if (priority !== "all" && a.priority !== priority) return false;
    if (needle && !`${a.id} ${a.source} ${a.message}`.toLowerCase().includes(needle)) return false;
    return true;
  });
  const byTime = (a, b) => String(b.timestamp).localeCompare(String(a.timestamp));
  const unack = (a) => String(a.state).includes("unacknowledged") ? 0 : 1;
  return out.sort(sort === "time" ? byTime : (a, b) => unack(a) - unack(b) || (RANK[String(a.priority)] ?? 9) - (RANK[String(b.priority)] ?? 9) || byTime(a, b));
}
function formatDuration(s) {
  return s >= 3600 ? `${+(s / 3600).toFixed(1)} h` : `${Math.round(s / 60)} min`;
}
var AlarmListView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "shelve_durations"]);
    this.filters = { view: "active", priority: "all", text: "", sort: "priority" };
    const b = this.body;
    b.setAttribute("role", "region");
    const select = (label, options, key) => {
      const s = html("select", { attrs: { "aria-label": label, "data-lm-suppress-shortcuts": "true" } }, Object.entries(options).map(([v, t]) => html("option", { text: t, attrs: { value: v } })));
      s.value = this.filters[key];
      s.addEventListener("change", () => {
        this.filters[key] = s.value;
        this.schedule();
      });
      return s;
    };
    this.viewSel = select("View", VIEWS, "view");
    this.prioSel = select("Priority", { all: "All priorities", critical: "P1", high: "P2", medium: "P3", low: "P4" }, "priority");
    this.search = html("input", { cls: "awi-al-search", attrs: { type: "search", placeholder: "Filter…", "aria-label": "Filter text", "data-lm-suppress-shortcuts": "true" } });
    this.search.addEventListener("input", () => {
      this.filters.text = this.search.value;
      this.schedule();
    });
    this.sortBtn = html("button", { cls: "awi-al-sort", attrs: { type: "button" } });
    this.sortBtn.addEventListener("click", () => {
      this.filters.sort = this.filters.sort === "priority" ? "time" : "priority";
      this.schedule();
    });
    this.counts = html("div", { cls: "awi-al-counts", attrs: { role: "status" } });
    const tools = html("div", { cls: "awi-al-tools" }, [this.viewSel, this.prioSel, this.search, this.sortBtn]);
    this.table = html("table", { cls: "awi-banner-table awi-al-table" });
    const head = html("tr", {}, ["Time", "Prio", "Tag", "Message", "State", ""].map((t) => html("th", { text: t, attrs: { scope: "col" } })));
    this.tbody = html("tbody");
    this.table.append(html("thead", {}, [head]), this.tbody);
    b.append(tools, this.counts, html("div", { cls: "awi-banner-scroll" }, [this.table]));
    this.schedule();
  }
  /** Operator action: always sent to the host; applied by the front end when no host owns the state (HOST-004). */
  send(msg) {
    if (!this.interactive) return;
    this.model.send(msg);
    alarmAction(this.model, msg);
  }
  actions(a) {
    const cell = html("td", { cls: "awi-al-actions" });
    if (this.get("mode") !== "control") return cell;
    const cat = category(a);
    if (String(a.state).includes("unacknowledged") && cat !== "suppressed") {
      const ack = html("button", { cls: "awi-ack", text: "ACK", attrs: { type: "button", "aria-label": `Acknowledge ${a.id}` } });
      ack.addEventListener("click", () => this.send({ type: "ack", alarm_id: a.id }));
      cell.appendChild(ack);
    }
    if (cat === "shelved") {
      const un = html("button", { cls: "awi-ack", text: "UNSHELVE", attrs: { type: "button", "aria-label": `Unshelve ${a.id}` } });
      un.addEventListener("click", () => this.send({ type: "unshelve", alarm_id: a.id }));
      cell.appendChild(un);
    } else if (cat === "active" && a.state !== "normal") {
      const durations = this.get("shelve_durations") || [];
      const sel = html("select", { cls: "awi-al-shelve", attrs: { "aria-label": `Shelve ${a.id}`, "data-lm-suppress-shortcuts": "true" } }, [
        html("option", { text: "Shelve…", attrs: { value: "" } }),
        ...durations.map((s) => html("option", { text: formatDuration(s), attrs: { value: String(s) } }))
      ]);
      sel.addEventListener("change", () => {
        if (sel.value) this.send({ type: "shelve", alarm_id: a.id, seconds: Number(sel.value) });
      });
      cell.appendChild(sel);
    }
    return cell;
  }
  draw() {
    const alarms = this.get("value") || [];
    const count2 = (pred) => alarms.filter(pred).length;
    const active = count2((a) => category(a) === "active" && a.state !== "normal");
    const unack = count2((a) => category(a) === "active" && String(a.state).includes("unacknowledged"));
    const shelved = count2((a) => category(a) === "shelved");
    const suppressed = count2((a) => category(a) === "suppressed");
    this.counts.textContent = `${active} active · ${unack} unacknowledged · ${shelved} shelved · ${suppressed} suppressed / OOS`;
    this.sortBtn.textContent = this.filters.sort === "priority" ? "Sort: priority" : "Sort: time";
    this.body.setAttribute("aria-label", `${this.get("label") || "Alarm list"}: ${this.counts.textContent}`);
    const rows = filterAlarms(alarms, this.filters);
    clear(this.tbody);
    for (const a of rows) {
      const cat = category(a);
      let state = STATE_TEXT2[a.state] || a.state;
      if (a.out_of_service) state = "OUT OF SERVICE";
      else if (a.suppressed) state = "SUPPRESSED";
      else if (cat === "shelved") state = `SHELVED until ${String(a.shelved_until).slice(11, 16)}`;
      const row = html("tr", { cls: `awi-prio-${a.priority} awi-state-${a.state} awi-al-${cat}` }, [
        html("td", { text: String(a.timestamp || "").replace("T", " ") }),
        html("td", {}, [html("span", { cls: "awi-prio-chip", text: PRIORITY_TEXT2[String(a.priority)] || String(a.priority) })]),
        html("td", { text: String(a.source || a.id) }),
        html("td", { text: String(a.message || a.id) }),
        html("td", { cls: "awi-al-state", text: state }),
        this.actions(a)
      ]);
      this.tbody.appendChild(row);
    }
    if (!rows.length) this.tbody.appendChild(html("tr", {}, [html("td", { text: "No alarm in this view", attrs: { colspan: "6" } })]));
  }
};

// js/src/widgets/annunciator.ts
var STATE_TEXT3 = { normal: "", alert: "ALARM", acknowledged: "ACK", ringback: "RINGBACK" };
var AnnunciatorView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "columns", "sequence", "first_out", "horn", "test"]);
    const b = this.body;
    b.setAttribute("role", "group");
    this.grid = html("div", { cls: "awi-ann-grid" });
    this.bar = html("div", { cls: "awi-ann-bar" });
    this.hornEl = html("span", { cls: "awi-ann-horn", attrs: { role: "status" } });
    this.buttons = {};
    for (const [key, text] of [["silence", "SILENCE"], ["acknowledge", "ACK"], ["reset", "RESET"], ["test", "TEST"]]) {
      const btn = html("button", { cls: `awi-ann-btn awi-ann-${key}`, text, attrs: { type: "button" } });
      if (key === "test") {
        const on = (e) => {
          e.preventDefault();
          this.lampTest(true);
        };
        const off = () => this.lampTest(false);
        btn.addEventListener("pointerdown", on);
        btn.addEventListener("pointerup", off);
        btn.addEventListener("pointerleave", () => this.get("test") && off());
        btn.addEventListener("keydown", (e) => (e.key === " " || e.key === "Enter") && !e.repeat && on(e));
        btn.addEventListener("keyup", (e) => (e.key === " " || e.key === "Enter") && off());
      } else {
        btn.addEventListener("click", () => this.action(key));
      }
      this.buttons[key] = btn;
    }
    this.bar.append(this.hornEl, ...Object.values(this.buttons));
    b.append(this.grid, this.bar);
    this.schedule();
  }
  /**
   * Operator push button (IND-043): always sent to the host; applied by the
   * front end when no host owns the state (HOST-004).
   */
  action(key) {
    if (!this.interactive) return;
    this.model.send({ type: key });
    annunciatorAction(this.model, key);
  }
  lampTest(on) {
    if (!this.interactive) return;
    this.model.send({ type: "test", on });
    if (!hostOwnsState(this.model)) {
      this.model.set("test", on);
      this.model.save_changes();
    }
  }
  draw() {
    const windows = this.get("value") || [];
    const test = !!this.get("test");
    this.grid.style.gridTemplateColumns = `repeat(${Math.max(1, this.get("columns") || 4)}, 1fr)`;
    clear(this.grid);
    const summary = [];
    for (const w of windows) {
      const state = test ? "test" : w.state;
      const cell = html("div", { cls: `awi-ann-window awi-ann-${w.color || "amber"} awi-ann-st-${state}${w.first ? " awi-ann-first" : ""}` });
      cell.append(html("div", { cls: "awi-ann-tag", text: w.tag ?? "" }), html("div", { cls: "awi-ann-text", text: w.text || "" }));
      const status = test ? "TEST" : [w.first ? "1ST" : "", STATE_TEXT3[w.state ?? "normal"] || ""].filter(Boolean).join(" · ");
      cell.appendChild(html("div", { cls: "awi-ann-status", text: status }));
      cell.setAttribute("role", "img");
      cell.setAttribute("aria-label", `${w.tag} ${w.text || ""}: ${status || "normal"}`);
      this.grid.appendChild(cell);
      if (w.state !== "normal") summary.push(`${w.tag} ${status}`);
    }
    const horn = !!this.get("horn");
    this.root.classList.toggle("awi-ann-sounding", horn);
    this.hornEl.textContent = horn ? "♪ HORN" : "";
    const control = this.get("mode") === "control";
    for (const btn of Object.values(this.buttons)) {
      btn.hidden = !control;
      btn.disabled = !!this.get("disabled");
    }
    this.buttons.reset.hidden = !control || this.get("sequence") === "A" && !this.get("first_out");
    this.body.setAttribute("aria-label", `${this.get("label") || "Annunciator"} (sequence ${this.get("sequence")}): ${summary.join(", ") || "all normal"}${horn ? ", horn sounding" : ""}`);
  }
};

// js/src/widgets/boolean.ts
var BOOL_TRAITS = [
  "value",
  "default_state",
  "mechanical_action",
  "confirm",
  "shape",
  "on_color",
  "off_color",
  "blink",
  "blink_hz",
  "orientation",
  "text",
  "_pressed",
  "color",
  "lamp",
  "lamp_color",
  "lamp_blink"
];
function mechanicalTransition(action, phase, value, defaultState) {
  const active = !defaultState;
  switch (action) {
    case "switch_when_pressed":
      return phase === "press" ? !value : null;
    case "switch_when_released":
      return phase === "release" ? !value : null;
    case "switch_until_released":
      return phase === "press" ? active : defaultState;
    case "latch_when_pressed":
    case "latch_until_released":
      return phase === "press" ? active : null;
    case "latch_when_released":
      return phase === "release" ? active : null;
    default:
      return null;
  }
}
var BooleanView = class extends BaseView {
  constructor(model, el) {
    super(model, el, BOOL_TRAITS);
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.stateText = svgText("", { class: "awi-state-text", "text-anchor": "middle", "dominant-baseline": "central" });
    this._armedUntil = 0;
    this._pressed = false;
    const b = this.body;
    b.setAttribute("aria-labelledby", this.labelEl.id);
    b.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || !this.interactive) return;
      e.preventDefault();
      b.focus({ preventScroll: true });
      b.setPointerCapture?.(e.pointerId);
      this.phase("press");
    });
    b.addEventListener("pointerup", (e) => {
      if (!this._pressed) return;
      const r = b.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      this.phase("release", inside);
    });
    b.addEventListener("pointercancel", () => this._pressed && this.phase("release", false));
    b.addEventListener("keydown", (e) => {
      if ((e.key === " " || e.key === "Enter") && this.interactive) {
        e.preventDefault();
        if (!e.repeat) this.phase("press");
      }
    });
    b.addEventListener("keyup", (e) => {
      if ((e.key === " " || e.key === "Enter") && this._pressed) {
        e.preventDefault();
        this.phase("release", true);
      }
    });
    this.listen("msg:custom", (msg) => {
      if (msg && msg.type === "latch_expired") {
        this.root.classList.add("awi-expired");
        setTimeout(() => this.root.classList.remove("awi-expired"), 600);
      }
    });
    this.schedule();
  }
  get isLed() {
    return this.kind === "led";
  }
  phase(phase, inside = true) {
    const value = !!this.get("value");
    const def = !!this.get("default_state");
    const action = this.get("mechanical_action");
    if (this.kind === "emergencystop") {
      if (phase === "press" && !value) this.write(true, true);
      else this.write(null, phase === "press");
      return;
    }
    let next = mechanicalTransition(action, phase, value, def);
    if (phase === "release" && !inside && action !== "switch_until_released") next = null;
    if (next !== null && this.get("confirm") && action !== "switch_until_released" && next !== value) {
      if (Date.now() > this._armedUntil) {
        this._armedUntil = Date.now() + 3e3;
        this.root.classList.add("awi-armed");
        this.schedule();
        setTimeout(() => {
          this.root.classList.remove("awi-armed");
          this.schedule();
        }, 3e3);
        next = null;
      } else {
        this._armedUntil = 0;
        this.root.classList.remove("awi-armed");
      }
    }
    this.write(next, phase === "press");
  }
  write(value, pressed) {
    if (this.stale !== "live") return;
    this._pressed = pressed;
    this.root.classList.toggle("awi-pressed", pressed);
    if (value !== null) this.model.set("value", value);
    this.model.set("_pressed", pressed);
    this.model.set("_seq", (this.get("_seq") || 0) + 1);
    this.model.save_changes();
    this.schedule();
  }
  draw() {
    const on = !!this.get("value");
    const [w, h] = this.get("size");
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    clear(s);
    this.root.classList.toggle("awi-on", on);
    this.root.classList.toggle("awi-blink", this.isLed && on && !!this.get("blink"));
    this.root.style.setProperty("--awi-blink-period", `${1 / (this.get("blink_hz") || 2)}s`);
    this.setColorVar("--awi-led-on", this.get("on_color"));
    this.setColorVar("--awi-led-off", this.get("off_color"));
    const control = this.get("mode") === "control" && !this.isLed;
    const b = this.body;
    b.tabIndex = control ? 0 : -1;
    const armed = this.root.classList.contains("awi-armed");
    const stateWord = armed ? "confirm?" : on ? "on" : "off";
    if (this.isLed || !control) {
      b.setAttribute("role", "img");
      b.setAttribute("aria-label", `${this.get("label") || this.kind}: ${stateWord}`);
      b.removeAttribute("aria-checked");
      b.removeAttribute("aria-pressed");
    } else if (this.kind === "pushbutton" || this.kind === "emergencystop") {
      b.setAttribute("role", "button");
      b.setAttribute("aria-pressed", String(on));
      b.removeAttribute("aria-label");
      if (!this.get("label")) b.setAttribute("aria-label", this.kind === "pushbutton" ? String(this.get("text") ?? "") : "Emergency stop");
      const lamp = this.get("lamp");
      if (this.kind === "pushbutton" && (lamp === true || lamp === false)) b.setAttribute("aria-description", `lamp ${lamp ? "on" : "off"}${lamp && this.get("lamp_blink") ? ", flashing" : ""}`);
      else b.removeAttribute("aria-description");
    } else {
      b.setAttribute("role", "switch");
      b.setAttribute("aria-checked", String(on));
      if (!this.get("label")) b.setAttribute("aria-label", this.kind);
    }
    const draw = {
      led: () => this.drawLed(w, h, on),
      toggleswitch: () => this.drawToggle(w, h, on),
      rockerswitch: () => this.drawRocker(w, h, on),
      slideswitch: () => this.drawSlide(w, h, on),
      pushbutton: () => this.drawPush(w, h, on, armed),
      emergencystop: () => this.drawEstop(w, h, on)
    }[this.kind];
    draw?.();
  }
  drawLed(w, h, on) {
    const r = Math.min(w, h) / 2 - 3;
    const cx = w / 2;
    const cy = h / 2;
    const shape = this.get("shape") === "square" ? svg("rect", { class: "awi-led", x: cx - r, y: cy - r, width: 2 * r, height: 2 * r, rx: 3 }) : svg("circle", { class: "awi-led", cx, cy, r });
    this.svgEl.appendChild(shape);
    if (on) this.svgEl.appendChild(svg("circle", { class: "awi-led-glint", cx: cx - r * 0.35, cy: cy - r * 0.35, r: r * 0.25 }));
  }
  drawToggle(w, h, on) {
    const vertical = this.get("orientation") !== "horizontal";
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.28;
    this.svgEl.appendChild(svg("rect", { class: "awi-plate", x: 2, y: 2, width: w - 4, height: h - 4, rx: 6 }));
    this.svgEl.appendChild(svg("circle", { class: "awi-bezel", cx, cy, r }));
    const len = (vertical ? h : w) * 0.36;
    const dir = on ? -1 : 1;
    const [x2, y2] = vertical ? [cx, cy + dir * len] : [cx - dir * len, cy];
    this.svgEl.appendChild(svg("line", { class: "awi-lever", x1: cx, y1: cy, x2, y2, "stroke-linecap": "round" }));
    this.svgEl.appendChild(svg("circle", { class: "awi-lever-tip", cx: x2, cy: y2, r: r * 0.55 }));
    const [tx, ty] = vertical ? [cx, on ? h - 11 : 11] : [on ? 16 : w - 16, cy];
    const label = svgText(on ? "ON" : "OFF", { class: "awi-state-small", x: tx, y: ty, "text-anchor": "middle", "dominant-baseline": "central" });
    this.svgEl.appendChild(label);
  }
  drawRocker(w, h, on) {
    const s = this.svgEl;
    s.appendChild(svg("rect", { class: "awi-plate", x: 2, y: 2, width: w - 4, height: h - 4, rx: 6 }));
    const inset = 8;
    const half = (h - 2 * inset) / 2;
    s.appendChild(svg("rect", { class: on ? "awi-rocker awi-down" : "awi-rocker", x: inset, y: inset, width: w - 2 * inset, height: half, rx: 3 }));
    s.appendChild(svg("rect", { class: on ? "awi-rocker" : "awi-rocker awi-down", x: inset, y: inset + half, width: w - 2 * inset, height: half, rx: 3 }));
    s.appendChild(svgText("I", { class: "awi-state-text", x: w / 2, y: inset + half / 2, "text-anchor": "middle", "dominant-baseline": "central" }));
    s.appendChild(svgText("O", { class: "awi-state-text", x: w / 2, y: inset + half * 1.5, "text-anchor": "middle", "dominant-baseline": "central" }));
  }
  drawSlide(w, h, on) {
    const s = this.svgEl;
    const r = (h - 8) / 2;
    s.appendChild(svg("rect", { class: "awi-slide-track", x: 4, y: 4, width: w - 8, height: h - 8, rx: r }));
    const cx = on ? w - 4 - r : 4 + r;
    s.appendChild(svg("circle", { class: "awi-slide-thumb", cx, cy: h / 2, r: r - 3 }));
    s.appendChild(svgText(on ? "ON" : "OFF", { class: "awi-state-small", x: on ? 4 + r + 4 : w - 4 - r - 4, y: h / 2, "text-anchor": "middle", "dominant-baseline": "central" }));
  }
  drawPush(w, h, on, armed) {
    const s = this.svgEl;
    const lamp = this.get("lamp");
    const hasLamp = lamp === true || lamp === false;
    const cap = hasLamp ? `awi-lamp-${this.get("lamp_color")}` : `awi-cap-${this.get("color") || "grey"}`;
    const lit = hasLamp && lamp;
    const cls = `awi-button ${cap}${lit ? " awi-lit" : ""}${lit && this.get("lamp_blink") ? " awi-lamp-blink" : ""}${this._pressed || on ? " awi-down" : ""}`;
    const text = armed ? "Confirm?" : String(this.get("text") ?? "");
    if (this.get("shape") === "round") {
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) / 2 - 2;
      s.appendChild(svg("circle", { class: "awi-bezel", cx, cy, r: R }));
      s.appendChild(svg("circle", { class: cls, cx, cy, r: R * (this._pressed || on ? 0.7 : 0.76) }));
      if (lit) s.appendChild(svg("circle", { class: "awi-lamp-ring", cx, cy, r: R * 0.88 }));
    } else {
      s.appendChild(svg("rect", { class: cls, x: 2, y: 2, width: w - 4, height: h - 4, rx: 8 }));
      if (lit) s.appendChild(svg("rect", { class: "awi-lamp-ring", x: 5, y: 5, width: w - 10, height: h - 10, rx: 6 }));
    }
    const ink = hasLamp ? lit ? `awi-ink-lamp ${cap}` : "awi-ink-dark" : cap;
    s.appendChild(svgText(text, { class: `awi-button-text ${ink}`, x: w / 2, y: h / 2, "text-anchor": "middle", "dominant-baseline": "central" }));
    if (on && !hasLamp && this.get("shape") !== "round") s.appendChild(svg("rect", { class: "awi-button-lamp", x: 8, y: h - 8, width: w - 16, height: 3, rx: 1.5 }));
  }
  drawEstop(w, h, on) {
    const s = this.svgEl;
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) / 2 - 2;
    s.appendChild(svg("circle", { class: "awi-estop-plate", cx, cy, r: R }));
    s.appendChild(svg("circle", { class: "awi-estop-mushroom", cx, cy, r: R * (on ? 0.58 : 0.66) }));
    s.appendChild(svgText(on ? "STOPPED" : "STOP", { class: "awi-estop-text", x: cx, y: cy, "text-anchor": "middle", "dominant-baseline": "central" }));
  }
};

// js/src/contract/bitfield.ts
function wordOf(value, bits) {
  const v = Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  return bits >= 32 ? v % 2 ** 32 : v % 2 ** bits;
}
function bitOf(value, n) {
  return Math.floor(value / 2 ** n) % 2 === 1;
}
function toggleBit(value, n, bits) {
  const v = wordOf(value, bits);
  return bitOf(v, n) ? v - 2 ** n : v + 2 ** n;
}
function activeBits(value, bits) {
  const v = wordOf(value, bits);
  return Array.from({ length: bits }, (_, n) => n).filter((n) => bitOf(v, n));
}

// js/src/core/format.ts
var SI = { "-24": "y", "-21": "z", "-18": "a", "-15": "f", "-12": "p", "-9": "n", "-6": "µ", "-3": "m", 0: "", 3: "k", 6: "M", 9: "G", 12: "T", 15: "P", 18: "E", 21: "Z", 24: "Y" };
var SPEC = /%(0?)(\d+)?(\.(\d+))?([fegnsxXbo])/;
var RADIX = { x: 16, X: 16, b: 2, o: 8 };
function radixOf(fmt) {
  const m = SPEC.exec(fmt || "");
  return m && RADIX[m[5]] || 10;
}
function engParts(v, precision) {
  if (v === 0) return { mant: 0 .toFixed(Math.max(0, precision - 1)), exp: 0 };
  let exp = Math.floor(Math.log10(Math.abs(v)) / 3) * 3;
  let mant = v / 10 ** exp;
  const intDigits = Math.floor(Math.log10(Math.abs(mant))) + 1;
  let decimals = Math.max(0, precision - intDigits);
  let text = mant.toFixed(decimals);
  if (Math.abs(Number(text)) >= 1e3) {
    exp += 3;
    mant = v / 10 ** exp;
    decimals = Math.max(0, precision - 1);
    text = mant.toFixed(decimals);
  }
  return { mant: text, exp };
}
function formatValue(v, fmt = "%.1f") {
  if (Number.isNaN(v)) return "NaN";
  if (v === Infinity) return "+Inf";
  if (v === -Infinity) return "-Inf";
  const m = SPEC.exec(fmt || "");
  if (!m) return String(v);
  const [, zero, width, , prec, type] = m;
  const precision = prec === void 0 ? type === "f" ? 1 : 3 : Number(prec);
  let body;
  switch (type) {
    case "f":
      body = v.toFixed(Math.min(precision, 20));
      break;
    case "e":
      body = v.toExponential(Math.min(precision, 20));
      break;
    case "g":
      body = String(Number(v.toPrecision(Math.max(1, Math.min(precision, 21)))));
      break;
    case "n": {
      const { mant, exp } = engParts(v, Math.max(1, precision));
      body = `${mant}e${exp}`;
      break;
    }
    case "s": {
      const { mant, exp } = engParts(v, Math.max(1, precision));
      const prefix2 = SI[exp];
      body = prefix2 === void 0 ? `${mant}e${exp}` : `${mant}${prefix2 ? ` ${prefix2}` : ""}`;
      break;
    }
    case "x":
    case "X":
    case "b":
    case "o": {
      const n = Math.round(v);
      const digits = Math.abs(n).toString(RADIX[type]);
      body = `${n < 0 ? "-" : ""}${type === "X" ? digits.toUpperCase() : digits}`;
      break;
    }
    default:
      body = String(v);
  }
  if (body === "-0" || /^-0\.?0*$/.test(body)) body = body.slice(1);
  if (width) body = pad2(body, Number(width), zero === "0");
  return (fmt || "").replace(SPEC, body);
}
function pad2(body, width, zeros) {
  if (body.length >= width || !/\d/.test(body)) return body;
  if (!zeros) return body.padStart(width, " ");
  const sign = body.startsWith("-") ? "-" : "";
  return sign + body.slice(sign.length).padStart(width - sign.length, "0");
}
function withUnit(text, unit) {
  if (!unit) return text;
  if (/ [a-zA-Zµ]$/.test(text)) return `${text}${unit}`;
  return `${text} ${unit}`;
}
function tickFormat(fmt) {
  const m = SPEC.exec(fmt || "");
  const type = m ? m[5] : "f";
  if (RADIX[type]) return `%${type}`;
  return type === "f" || type === "g" ? "%.4g" : `%.2${type}`;
}
var PREFIX = { y: -24, z: -21, a: -18, f: -15, p: -12, n: -9, u: -6, "µ": -6, m: -3, k: 3, M: 6, G: 9, T: 12, P: 15, E: 18 };
var ENTRY = /^([-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)\s*([yzafpnuµmkMGTPE]?)$/i;
var DIGITS = { 16: /^[0-9a-f]+$/i, 2: /^[01]+$/, 8: /^[0-7]+$/ };
var PREFIXED = /^([-+]?)0([xbo])(\w+)$/i;
function parseInteger(sign, digits, radix) {
  if (!DIGITS[radix].test(digits)) return Number.NaN;
  const v = parseInt(digits, radix);
  return sign === "-" ? -v : v;
}
function parseEntry(text, unit = "", radix = 10) {
  let t = String(text ?? "").trim();
  if (unit && t.endsWith(unit)) t = t.slice(0, -unit.length).trim();
  const p = PREFIXED.exec(t);
  if (p) return parseInteger(p[1], p[3], { x: 16, b: 2, o: 8 }[p[2].toLowerCase()]);
  if (radix !== 10) {
    const r = /^([-+]?)(\w+)$/.exec(t);
    return r ? parseInteger(r[1], r[2], radix) : Number.NaN;
  }
  t = t.replace(",", ".");
  const m = ENTRY.exec(t);
  if (!m) return Number.NaN;
  const exp = m[2] ? PREFIX[m[2]] ?? PREFIX[m[2].toLowerCase()] : 0;
  if (exp === void 0) return Number.NaN;
  return Number(m[1]) * 10 ** exp;
}

// js/src/widgets/bitfield.ts
var TRAITS = ["value", "bits", "labels", "colors", "on_color", "msb_first", "show_hex"];
function wordHex(value, bits) {
  return `0x${formatValue(wordOf(value, bits), `%0${bits / 4}X`)}`;
}
var BitFieldView = class extends BaseView {
  constructor(model, el) {
    super(model, el, TRAITS);
    this.cells = [];
    this.body.setAttribute("role", "group");
    this.row = html("div", { cls: "awi-bf-row" });
    this.hex = html("span", { cls: "awi-bf-hex" });
    this.body.append(this.row, this.hex);
    this.schedule();
  }
  /** Bit numbers in drawing order. */
  order(bits) {
    const n = Array.from({ length: bits }, (_, k) => k);
    return this.get("msb_first") ? n.reverse() : n;
  }
  /** IND-112: a click on a bit toggles it (control mode). */
  toggle(bit) {
    if (!this.interactive) return;
    this.model.set("value", toggleBit(this.get("value"), bit, this.get("bits")));
    this.model.save_changes();
  }
  draw() {
    const bits = this.get("bits");
    const value = wordOf(this.get("value"), bits);
    const labels = this.get("labels");
    const colors = this.get("colors");
    const onColor = safeColor(this.get("on_color")) || "var(--awi-led-on)";
    const order = this.order(bits);
    if (this.cells.length !== bits || this.cells[0]?.dataset.bit !== String(order[0])) {
      clear(this.row);
      this.cells = order.map((bit) => {
        const cell = html("button", { cls: "awi-bf-bit", attrs: { type: "button", "data-bit": String(bit) } }, [
          html("span", { cls: "awi-bf-lamp", attrs: { "aria-hidden": "true" } }),
          html("span", { cls: "awi-bf-num", text: String(bit), attrs: { "aria-hidden": "true" } }),
          html("span", { cls: "awi-bf-label", attrs: { "aria-hidden": "true" } })
        ]);
        cell.addEventListener("click", () => this.toggle(bit));
        if (bit % 4 === (this.get("msb_first") ? 0 : 3) && bit !== order[order.length - 1]) cell.classList.add("awi-bf-nibble");
        this.row.appendChild(cell);
        return cell;
      });
    }
    const interactive = this.interactive;
    this.cells.forEach((cell) => {
      const bit = Number(cell.dataset.bit);
      const set2 = bitOf(value, bit);
      const label = labels[bit] || "";
      const name = label || `bit ${bit}`;
      cell.classList.toggle("awi-bf-on", set2);
      cell.classList.toggle("awi-bf-unused", !label);
      cell.style.setProperty("--awi-bf-on", safeColor(colors[bit]) || onColor);
      setText(cell.children[0], set2 ? "1" : "0");
      setText(cell.children[2], label);
      setAttr(cell, "title", `bit ${bit}${label ? `: ${label}` : ""}`);
      setAttr(cell, "aria-label", `${name}, bit ${bit}`);
      setAttr(cell, "aria-pressed", String(set2));
      if (cell.disabled !== !interactive) cell.disabled = !interactive;
    });
    this.hex.hidden = !this.get("show_hex");
    setText(this.hex, wordHex(value, bits));
    const on = activeBits(value, bits).map((bit) => labels[bit] ? `${bit} ${labels[bit]}` : String(bit));
    setAttr(this.body, "aria-label", `${this.get("label") || "Bit field"}: ${wordHex(value, bits)}, ${on.length ? `set: ${on.join(", ")}` : "no bit set"}`);
  }
};

// js/src/contract/recipe.ts
var TYPES = ["number", "choice", "bool", "text"];
var finiteOrNull = (v) => typeof v === "number" && Number.isFinite(v) ? v : null;
function typeDefault(col) {
  if (col.type === "choice") return col.choices[0] ?? "";
  if (col.type === "bool") return false;
  if (col.type === "text") return "";
  let v = 0;
  if (col.min !== null) v = Math.max(v, col.min);
  if (col.max !== null) v = Math.min(v, col.max);
  return v;
}
function normalizeColumn(raw, index = 0) {
  const c = typeof raw === "string" ? { name: raw } : raw && typeof raw === "object" ? raw : {};
  const name = c.name ? String(c.name) : `column ${index + 1}`;
  const type = TYPES.includes(c.type) ? c.type : "number";
  let min = finiteOrNull(c.min);
  let max = finiteOrNull(c.max);
  if (min !== null && max !== null && !(max >= min)) [min, max] = [null, null];
  const col = {
    name,
    title: c.title ? String(c.title) : name,
    type,
    unit: c.unit ? String(c.unit) : "",
    min,
    max,
    step: Math.max(0, finiteOrNull(c.step) ?? 0),
    format: c.format ? String(c.format) : "%.4g",
    choices: Array.isArray(c.choices) ? c.choices.map(String) : [],
    readonly: !!c.readonly
  };
  const d = c.default === void 0 || c.default === null ? typeDefault(col) : checkCell({ ...col, default: typeDefault(col) }, c.default);
  const value = typeof d === "object" ? d.ok ? d.value : typeDefault(col) : d;
  return { ...col, default: value };
}
function rangeText(col) {
  const u = col.unit ? ` ${col.unit}` : "";
  const g = (v) => String(Number(v.toPrecision(6)));
  if (col.min !== null && col.max !== null) return `enter a value between ${g(col.min)} and ${g(col.max)}${u}`;
  return col.min !== null ? `enter a value of at least ${g(col.min)}${u}` : `enter a value of at most ${g(col.max)}${u}`;
}
function checkCell(col, value) {
  if (col.type === "bool") return typeof value === "boolean" ? { ok: true, value } : { ok: false, reason: "Not a Boolean" };
  if (col.type === "text") return typeof value === "string" ? { ok: true, value } : { ok: false, reason: "Not a text" };
  if (col.type === "choice") return typeof value === "string" && col.choices.includes(value) ? { ok: true, value } : { ok: false, reason: `Not one of ${col.choices.join(", ")}` };
  if (typeof value !== "number") return { ok: false, reason: "Not a number" };
  if (!Number.isFinite(value)) return { ok: false, reason: "Not a finite number" };
  let v = value;
  if (col.min !== null && v < col.min || col.max !== null && v > col.max) return { ok: false, reason: `Out of range: ${rangeText(col)}` };
  if (col.step > 0) {
    const base = col.min ?? 0;
    v = base + Math.floor((v - base) / col.step + 0.5) * col.step;
    if (col.min !== null) v = Math.max(v, col.min);
    if (col.max !== null) v = Math.min(v, col.max);
    v = Number(v.toPrecision(12));
  }
  return { ok: true, value: v };
}
function checkTyped(col, text) {
  const v = parseEntry(text, col.unit, radixOf(col.format));
  if (Number.isNaN(v)) return { ok: false, reason: "Not a number" };
  return checkCell(col, v);
}
function defaultRow(columns) {
  return Object.fromEntries(columns.map((c) => [c.name, c.default]));
}
function sortedOrder(rows, column, descending = false) {
  const order = rows.map((_, i) => i);
  if (!column) return order;
  const key = (i) => rows[i][column];
  return order.sort((a, b) => {
    const x = key(a);
    const y = key(b);
    const c = typeof x === "number" && typeof y === "number" ? x - y : String(x ?? "").localeCompare(String(y ?? ""), void 0, { numeric: true });
    return (descending ? -c : c) || a - b;
  });
}

// js/src/widgets/recipe.ts
var TRAITS2 = ["columns", "value", "row_edit", "max_rows"];
function cellText(col, v) {
  if (col.type === "bool") return v === true ? "☑ yes" : "☐ no";
  if (col.type === "number") return typeof v === "number" ? formatValue(v, col.format) : "";
  return v === void 0 || v === null ? "" : String(v);
}
var RecipeView = class extends BaseView {
  constructor(model, el) {
    super(model, el, TRAITS2);
    this.sortColumn = null;
    this.sortDesc = false;
    /** An edit field has the focus: redraws wait until it is left. */
    this.editing = false;
    this.body.setAttribute("role", "region");
    this.table = html("table", { cls: "awi-rt-table" });
    this.thead = html("thead");
    this.tbody = html("tbody");
    this.table.append(this.thead, this.tbody);
    this.msg = html("div", { cls: "awi-entry-msg awi-rt-msg", attrs: { role: "alert" } });
    this.addBtn = html("button", { cls: "awi-rt-add", text: "+ Add row", attrs: { type: "button" } });
    this.addBtn.addEventListener("click", () => this.addRow());
    this.body.append(html("div", { cls: "awi-rt-scroll" }, [this.table]), html("div", { cls: "awi-rt-foot" }, [this.addBtn, this.msg]));
    this.tbody.addEventListener("focusin", () => this.editing = true);
    this.tbody.addEventListener("focusout", () => {
      this.editing = false;
      this.schedule();
    });
    this.listen("msg:custom", (msg) => {
      const m = msg;
      if (!m || m.type !== "rejected") return;
      const col = this.columns().find((c) => c.name === m.column);
      this.showMessage(`${typeof m.row === "number" ? `Row ${m.row + 1}` : "Row"}${col ? `, ${col.title}` : ""}: ${String(m.reason ?? "rejected")}`);
    });
    this.schedule();
  }
  columns() {
    return this.get("columns").map((c, i) => normalizeColumn(c, i));
  }
  rows() {
    return this.get("value");
  }
  showMessage(text) {
    setText(this.msg, text);
  }
  /** Rows written by the front end when no host owns the state (HOST-012). */
  applyLocally(rows) {
    if (hostOwnsState(this.model)) return;
    this.model.set("value", rows);
    this.model.save_changes();
  }
  /** Confirm a cell (IND-113): checked here, sent to the host, applied without one. */
  commit(row, col, check, field) {
    if (!this.interactive) return false;
    field?.toggleAttribute("aria-invalid", !check.ok);
    if (!check.ok) {
      this.showMessage(`Row ${row + 1}, ${col.title}: ${check.reason}`);
      return false;
    }
    this.showMessage("");
    const rows = this.rows();
    if (rows[row]?.[col.name] === check.value) return true;
    this.model.send({ type: "edit", row, column: col.name, value: check.value });
    this.applyLocally(rows.map((r, i) => i === row ? { ...r, [col.name]: check.value } : r));
    return true;
  }
  addRow() {
    if (!this.interactive || !this.get("row_edit") || this.rows().length >= this.get("max_rows")) return;
    this.model.send({ type: "add" });
    this.applyLocally([...this.rows(), defaultRow(this.columns())]);
  }
  deleteRow(row) {
    if (!this.interactive || !this.get("row_edit")) return;
    this.model.send({ type: "delete", row });
    this.applyLocally(this.rows().filter((_, i) => i !== row));
  }
  sortBy(name) {
    this.sortDesc = this.sortColumn === name ? !this.sortDesc : false;
    this.sortColumn = name;
    this.schedule();
  }
  /** Edit field of a cell (control mode). */
  editor(row, col, v) {
    const label = `Row ${row + 1}, ${col.title}`;
    if (col.type === "bool") {
      const box = html("input", { attrs: { type: "checkbox", "aria-label": label } });
      box.checked = v === true;
      box.addEventListener("change", () => this.commit(row, col, checkCell(col, box.checked), box));
      return box;
    }
    if (col.type === "choice") {
      const sel = html("select", { attrs: { "aria-label": label } }, col.choices.map((c) => html("option", { text: c, attrs: { value: c } })));
      sel.value = String(v ?? "");
      sel.addEventListener("change", () => this.commit(row, col, checkCell(col, sel.value), sel));
      return sel;
    }
    const field = html("input", { cls: "awi-entry", attrs: { type: "text", "aria-label": label, inputmode: col.type === "number" ? "decimal" : "text" } });
    const shown = cellText(col, v);
    field.value = shown;
    let committed = shown;
    const confirm = () => {
      if (field.value === committed) return true;
      const ok = this.commit(row, col, col.type === "number" ? checkTyped(col, field.value) : checkCell(col, field.value), field);
      if (ok) committed = field.value;
      return ok;
    };
    field.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        e.preventDefault();
        if (confirm()) field.blur();
      } else if (e.key === "Escape") {
        field.value = committed;
        field.removeAttribute("aria-invalid");
        this.showMessage("");
        field.blur();
      }
    });
    field.addEventListener("change", () => void confirm());
    return field;
  }
  draw() {
    if (this.editing) return;
    const cols = this.columns();
    const rows = this.rows();
    const interactive = this.interactive;
    const rowEdit = interactive && !!this.get("row_edit");
    clear(this.thead);
    const head = html("tr", {}, [html("th", { text: "#", attrs: { scope: "col" } })]);
    for (const col of cols) {
      const sorted = this.sortColumn === col.name;
      const btn = html("button", { cls: "awi-rt-sort", text: `${col.title}${col.unit ? ` (${col.unit})` : ""}${sorted ? this.sortDesc ? " ▼" : " ▲" : ""}`, attrs: { type: "button", title: `Sort by ${col.title}` } });
      btn.addEventListener("click", () => this.sortBy(col.name));
      head.appendChild(html("th", { attrs: { scope: "col", "aria-sort": sorted ? this.sortDesc ? "descending" : "ascending" : "none" } }, [btn]));
    }
    if (rowEdit) head.appendChild(html("th", { attrs: { scope: "col", "aria-label": "Actions" } }));
    this.thead.appendChild(head);
    clear(this.tbody);
    for (const i of sortedOrder(rows, this.sortColumn, this.sortDesc)) {
      const tr = html("tr", {}, [html("th", { text: String(i + 1), attrs: { scope: "row" } })]);
      for (const col of cols) {
        const v = rows[i][col.name];
        const invalid = !checkCell(col, v).ok;
        const td = html("td", { cls: `awi-rt-${col.type}${invalid ? " awi-rt-invalid" : ""}` });
        if (interactive && !col.readonly) td.appendChild(this.editor(i, col, v));
        else td.textContent = invalid ? `⚠ ${String(v ?? "")}` : cellText(col, v);
        tr.appendChild(td);
      }
      if (rowEdit) {
        const del = html("button", { cls: "awi-rt-del", text: "✕", attrs: { type: "button", "aria-label": `Delete row ${i + 1}`, title: `Delete row ${i + 1}` } });
        del.addEventListener("click", () => this.deleteRow(i));
        tr.appendChild(html("td", {}, [del]));
      }
      this.tbody.appendChild(tr);
    }
    this.addBtn.hidden = !rowEdit;
    this.addBtn.disabled = rows.length >= this.get("max_rows");
    setAttr(this.body, "aria-label", `${this.get("label") || "Recipe table"}: ${rows.length} row${rows.length === 1 ? "" : "s"}, ${cols.length} column${cols.length === 1 ? "" : "s"}${cols.length ? ` (${cols.map((c) => withUnit(c.title, c.unit)).join(", ")})` : ""}`);
  }
};

// js/src/contract/tree.ts
var NODE_STATUSES = ["", "normal", "running", "stopped", "offline", "maintenance", "warning", "alarm", "fault"];
function flattenTree(nodes) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  const walk = (items, depth, parent) => {
    const ids = [];
    for (const raw of Array.isArray(items) ? items : []) {
      const r = raw && typeof raw === "object" ? raw : {};
      if (typeof r.label !== "string") continue;
      const id = r.id === void 0 || r.id === null || r.id === "" ? parent ? `${parent}/${r.label}` : r.label : String(r.id);
      const status = r.status ?? "";
      if (!NODE_STATUSES.includes(status) || seen.has(id)) continue;
      seen.add(id);
      const node = { id, label: r.label, level: typeof r.level === "string" ? r.level : "", status, depth, parent, children: [] };
      out.push(node);
      node.children = walk(r.children, depth + 1, id);
      ids.push(id);
    }
    return ids;
  };
  walk(nodes, 0, "");
  return out;
}
function rollupStatus(flat, id) {
  const byId = new Map(flat.map((n) => [n.id, n]));
  let worst = "";
  const stack = [id];
  while (stack.length) {
    const n = byId.get(stack.pop());
    if (!n) continue;
    if (NODE_STATUSES.indexOf(n.status) > NODE_STATUSES.indexOf(worst)) worst = n.status;
    stack.push(...n.children);
  }
  return worst;
}
function visibleIds(flat, expanded) {
  const open = new Set(expanded);
  const shown = /* @__PURE__ */ new Set();
  const out = [];
  for (const n of flat) {
    if (n.parent === "" || shown.has(n.parent) && open.has(n.parent)) {
      shown.add(n.id);
      out.push(n.id);
    }
  }
  return out;
}

// js/src/widgets/tree.ts
var TRAITS3 = ["value", "nodes", "expanded", "show_level"];
var STATUS_TEXT = {
  normal: ["●", "normal"],
  running: ["▶", "running"],
  stopped: ["■", "stopped"],
  offline: ["○", "offline"],
  maintenance: ["◇", "maintenance"],
  warning: ["▲", "warning"],
  alarm: ["◆", "alarm"],
  fault: ["✖", "fault"]
};
var RANK2 = (s) => Object.keys(STATUS_TEXT).indexOf(s);
var TreeView = class extends BaseView {
  constructor(model, el) {
    super(model, el, TRAITS3);
    /** Row that has the keyboard focus (roving tabindex). */
    this.focusId = "";
    this.flat = [];
    this.list = html("div", { cls: "awi-et-list", attrs: { role: "tree" } });
    this.body.appendChild(this.list);
    this.list.addEventListener("keydown", (e) => this.onKey(e));
    this.schedule();
  }
  node(id) {
    return this.flat.find((n) => n.id === id);
  }
  get canNavigate() {
    return !this.get("disabled") && this.stale === "live";
  }
  setExpanded(id, open) {
    const n = this.node(id);
    if (!this.canNavigate || !n || !n.children.length) return;
    const cur = this.get("expanded");
    if (open === cur.includes(id)) return;
    this.model.set("expanded", open ? [...cur, id] : cur.filter((x) => x !== id));
    this.model.save_changes();
    this.schedule();
  }
  select(id) {
    this.focusId = id;
    if (!this.interactive || !this.node(id)) return this.schedule();
    if (this.get("value") !== id) {
      this.model.set("value", id);
      this.model.save_changes();
    }
    this.schedule();
  }
  focusRow(id) {
    this.focusId = id;
    this.draw();
    this.rowOf(id)?.focus();
  }
  rowOf(id) {
    return [...this.list.children].find((r) => r.dataset.id === id);
  }
  onKey(e) {
    if (!this.canNavigate) return;
    const shown = visibleIds(this.flat, this.get("expanded"));
    const i = shown.indexOf(this.focusId);
    const n = this.node(this.focusId);
    const open = n ? this.get("expanded").includes(n.id) : false;
    switch (e.key) {
      case "ArrowDown":
        if (i < shown.length - 1) this.focusRow(shown[i + 1]);
        break;
      case "ArrowUp":
        if (i > 0) this.focusRow(shown[i - 1]);
        break;
      case "Home":
        if (shown.length) this.focusRow(shown[0]);
        break;
      case "End":
        if (shown.length) this.focusRow(shown[shown.length - 1]);
        break;
      case "ArrowRight":
        if (n && n.children.length && !open) this.setExpanded(n.id, true);
        else if (n && open) this.focusRow(n.children[0]);
        break;
      case "ArrowLeft":
        if (n && open) this.setExpanded(n.id, false);
        else if (n?.parent) this.focusRow(n.parent);
        break;
      case "Enter":
      case " ":
        if (n) this.select(n.id);
        break;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
  }
  draw() {
    this.flat = flattenTree(this.get("nodes"));
    const expanded = this.get("expanded");
    const selected = this.get("value");
    const shown = visibleIds(this.flat, expanded);
    if (!shown.includes(this.focusId)) this.focusId = shown.includes(selected) ? selected : shown[0] ?? "";
    const hadFocus = this.list.contains(document.activeElement);
    const showLevel = this.get("show_level");
    clear(this.list);
    const siblings = (n) => n.parent ? this.node(n.parent)?.children ?? [] : this.flat.filter((m) => m.depth === 0).map((m) => m.id);
    for (const id of shown) {
      const n = this.node(id);
      const open = expanded.includes(id);
      const below = n.children.length && !open ? rollupStatus(this.flat, id) : "";
      const rollup = below && RANK2(below) > RANK2(n.status) ? below : "";
      const sib = siblings(n);
      const twisty = html("span", { cls: "awi-et-twisty", text: n.children.length ? open ? "▾" : "▸" : "", attrs: { "aria-hidden": "true" } });
      twisty.addEventListener("click", (e) => {
        e.stopPropagation();
        this.focusId = id;
        this.setExpanded(id, !open);
      });
      const parts = [twisty];
      if (n.status) parts.push(this.chip(n.status, false));
      parts.push(html("span", { cls: "awi-et-label", text: n.label }));
      if (showLevel && n.level) parts.push(html("span", { cls: "awi-et-level", text: n.level }));
      if (rollup) parts.push(this.chip(rollup, true));
      const row = html("div", { cls: "awi-et-row", attrs: { "data-id": id, role: "treeitem", "data-lm-suppress-shortcuts": "true" } }, parts);
      row.style.paddingLeft = `${4 + 16 * n.depth}px`;
      row.classList.toggle("awi-et-selected", id === selected);
      const words = [n.label, showLevel && n.level ? n.level : "", n.status ? STATUS_TEXT[n.status][1] : "", rollup ? `${STATUS_TEXT[rollup][1]} below` : ""];
      setAttr(row, "aria-label", words.filter(Boolean).join(", "));
      setAttr(row, "aria-level", String(n.depth + 1));
      setAttr(row, "aria-setsize", String(sib.length));
      setAttr(row, "aria-posinset", String(sib.indexOf(id) + 1));
      setAttr(row, "aria-selected", String(id === selected));
      setAttr(row, "aria-expanded", n.children.length ? String(open) : null);
      row.tabIndex = id === this.focusId ? 0 : -1;
      row.addEventListener("click", () => this.select(id));
      row.addEventListener("dblclick", () => this.setExpanded(id, !open));
      this.list.appendChild(row);
    }
    setAttr(this.list, "aria-label", String(this.get("label") || "Equipment tree"));
    setAttr(this.list, "aria-disabled", this.canNavigate ? null : "true");
    if (hadFocus) this.rowOf(this.focusId)?.focus();
  }
  chip(status, rollup) {
    const [symbol, word] = STATUS_TEXT[status];
    return html("span", {
      cls: `awi-et-status awi-et-s-${status}${rollup ? " awi-et-rollup" : ""}`,
      text: rollup ? `${symbol} ${word} below` : `${symbol} ${word}`,
      attrs: { "aria-hidden": "true", title: rollup ? `Most severe status below: ${word}` : word }
    });
  }
};

// js/src/contract/svgpanel.ts
var ROLES = {
  text: { format: ["text", "%.1f"], unit: ["text", ""] },
  rotate: { min: ["number", 0], max: ["number", 100], from: ["number", -135], to: ["number", 135], cx: ["number", null], cy: ["number", null] },
  scale: { min: ["number", 0], max: ["number", 100], edge: ["text", "bottom"] },
  show: { eq: ["text", null] },
  state: {},
  case: {},
  color: { on: ["color", "#22c55e"], off: ["color", "#6b7280"], eq: ["text", null] },
  button: { label: ["text", ""] },
  momentary: { label: ["text", ""] },
  set: { value: ["text", ""], label: ["text", ""] },
  step: { step: ["number", 1], min: ["number", 0], max: ["number", 100], label: ["text", ""], unit: ["text", ""], format: ["text", "%.1f"] }
};
var CONTROL_ROLES = ["button", "momentary", "set", "step"];
var EDGES = ["bottom", "top", "left", "right"];
var NAME = /^[A-Za-z0-9_.\-/]+$/;
var NUMBER = /^\s*[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?\s*$/i;
var COLOR = /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+|(rgb|hsl)a?\([0-9.,%\s]+\))$/;
function parseRole(label) {
  const text = label.trim();
  if (!text.startsWith("awi:")) return null;
  const [head, ...rest] = text.slice(4).split(";").map((p) => p.trim());
  const eq = head.indexOf("=");
  const role = (eq < 0 ? head : head.slice(0, eq)).trim();
  const name = eq < 0 ? "" : head.slice(eq + 1).trim();
  if (!(role in ROLES)) return `unknown role '${role}'`;
  if (eq < 0 || !NAME.test(name)) return `role '${role}' needs a name (letters, digits, _ . - /)`;
  const spec = ROLES[role];
  const options = Object.fromEntries(Object.entries(spec).map(([k, [, d]]) => [k, d]));
  for (const part of rest) {
    if (!part) continue;
    const i = part.indexOf("=");
    const key = (i < 0 ? part : part.slice(0, i)).trim();
    const raw = i < 0 ? "" : part.slice(i + 1).trim();
    if (!(key in spec) || i < 0) return `unknown option '${key}' for role '${role}'`;
    const kind = spec[key][0];
    if (kind === "number") {
      const v = NUMBER.test(raw) ? Number(raw) : NaN;
      if (Number.isNaN(v)) return `option '${key}' must be a number, got '${raw}'`;
      if (!Number.isFinite(v)) return `option '${key}' must be finite`;
      options[key] = v;
    } else if (kind === "color") {
      if (!COLOR.test(raw)) return `option '${key}' is not a color: '${raw}'`;
      options[key] = raw;
    } else options[key] = raw;
  }
  if ("min" in options && "max" in options && !(options.max > options.min)) return "option 'max' must be greater than 'min'";
  if (role === "scale" && !EDGES.includes(String(options.edge))) return `option 'edge' must be one of ${EDGES.join(", ")}`;
  if (role === "step" && !(options.step > 0)) return "option 'step' must be positive";
  return { role, name, options };
}
function truthy(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) && value !== 0;
  if (typeof value === "string") return !["", "0", "false", "off", "no"].includes(value.trim().toLowerCase());
  return false;
}
function optionValue(raw) {
  const t = raw.trim().toLowerCase();
  if (t === "true" || t === "false") return t === "true";
  const v = NUMBER.test(raw) ? Number(raw) : NaN;
  return Number.isFinite(v) ? v : raw;
}
function matches(raw, value) {
  const expected = optionValue(raw);
  if (typeof value === "boolean" || typeof expected === "boolean") return typeof value === "boolean" && value === expected;
  if (typeof value === "number" && typeof expected === "number") return value === expected;
  return value !== null && value !== void 0 && typeof value !== "number" && String(value) === raw.trim();
}
function fraction(value, options) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const min = options.min;
  const max = options.max;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}
function rotateAngle(value, options) {
  const f = fraction(value, options);
  return f === null ? null : options.from + f * (options.to - options.from);
}
function stepValue(value, direction, options) {
  const min = options.min;
  const max = options.max;
  const base = typeof value === "number" && Number.isFinite(value) ? value : min;
  return Number(Math.min(max, Math.max(min, base + direction * options.step)).toPrecision(12));
}

// js/src/core/entry.ts
function checkEntry(text, { min, max, step = 0, unit = "", coerce = false, format = "%.1f" }) {
  const v = parseEntry(text, unit, radixOf(format));
  const range = `${withUnit(formatValue(min, format), unit)} … ${withUnit(formatValue(max, format), unit)}`;
  if (!Number.isFinite(v)) return { ok: false, reason: `Not a number: enter a value between ${range}` };
  if ((v < min || v > max) && !coerce) return { ok: false, reason: `Out of range: enter a value between ${range}` };
  return { ok: true, value: snap(v, min, max, step) };
}

// js/src/widgets/svgpanel.ts
var TRAITS4 = ["svg", "value", "problems", "show_entries"];
function labelOf(el) {
  return el.getAttribute("data-awi") || el.getAttribute("inkscape:label") || "";
}
function scanDrawing(root) {
  const bindings = [];
  const problems = [];
  const walk = (el, state) => {
    const label = labelOf(el);
    const parsed = label ? parseRole(label) : null;
    const where = el.getAttribute("id") || label;
    let here = state;
    if (typeof parsed === "string") problems.push(`${where}: ${parsed}`);
    else if (parsed) {
      if (parsed.role === "case" && state === null) problems.push(`${where}: a 'case' must be inside a 'state' element`);
      else bindings.push({ ...parsed, el, base: el.getAttribute("transform") || "", state: parsed.role === "case" ? state : void 0 });
      if (parsed.role === "state") here = parsed.name;
    }
    for (const child of Array.from(el.children)) walk(child, here);
  };
  walk(root, null);
  return { bindings, problems };
}
function bbox(el) {
  try {
    const b = el.getBBox();
    return b.width || b.height ? b : null;
  } catch {
    return null;
  }
}
var SvgPanelView = class extends BaseView {
  constructor(model, el) {
    super(model, el, TRAITS4);
    this.bindings = [];
    this.localProblems = [];
    this._svgKey = void 0;
    this._entryKey = "";
    this.body.setAttribute("role", "group");
    this.stage = html("div", { cls: "awi-svp-stage" });
    this.entries = html("div", { cls: "awi-svp-entries" });
    this.msg = html("div", { cls: "awi-svp-msg", attrs: { role: "status" } });
    this.body.append(this.stage, this.entries, this.msg);
    this.schedule();
  }
  values() {
    const v = this.get("value");
    return v && typeof v === "object" ? v : {};
  }
  /** Operator action (IND-123): the new value goes to the kernel. */
  write(name, value) {
    if (!this.interactive) return;
    this.model.set("value", { ...this.values(), [name]: value });
    this.model.save_changes();
    this.schedule();
  }
  build() {
    clear(this.stage);
    this.bindings = [];
    this.localProblems = [];
    const root = parseSkin(this.get("svg"));
    if (!root) {
      if (this.get("svg")) this.localProblems.push("the drawing is not a valid SVG document");
      return;
    }
    root.setAttribute("class", "awi-svp-svg");
    root.removeAttribute("width");
    root.removeAttribute("height");
    this.stage.appendChild(root);
    const { bindings, problems } = scanDrawing(root);
    this.bindings = bindings;
    this.localProblems = problems;
    for (const b of bindings) if (CONTROL_ROLES.includes(b.role)) this.attachControl(b);
  }
  attachControl(b) {
    const el = b.el;
    const name = String(b.options.label || (b.role === "set" ? b.options.value : "") || b.name);
    el.classList.add("awi-svp-control");
    el.setAttribute("data-lm-suppress-shortcuts", "true");
    el.setAttribute("role", b.role === "step" ? "spinbutton" : "button");
    el.setAttribute("aria-label", name);
    const act = (dir = 1) => {
      const v = this.values()[b.name];
      if (b.role === "button") this.write(b.name, !truthy(v));
      else if (b.role === "set") this.write(b.name, optionValue(String(b.options.value)));
      else if (b.role === "step") this.write(b.name, stepValue(v, dir, b.options));
    };
    if (b.role === "momentary") {
      const press = (on) => {
        if (truthy(this.values()[b.name]) !== on) this.write(b.name, on);
      };
      el.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        el.setPointerCapture?.(e.pointerId);
        press(true);
      });
      for (const ev of ["pointerup", "pointercancel", "lostpointercapture"]) el.addEventListener(ev, () => press(false));
      el.addEventListener("keydown", (e) => {
        if (e.key !== " " && e.key !== "Enter") return;
        e.preventDefault();
        if (!e.repeat) press(true);
      });
      el.addEventListener("keyup", (e) => {
        if (e.key === " " || e.key === "Enter") press(false);
      });
      el.addEventListener("blur", () => press(false));
      return;
    }
    el.addEventListener("click", (e) => act(e.shiftKey ? -1 : 1));
    el.addEventListener("keydown", (e) => {
      const key = e.key;
      if (key === " " || key === "Enter") act(1);
      else if (b.role === "step" && (key === "ArrowUp" || key === "ArrowRight")) act(1);
      else if (b.role === "step" && (key === "ArrowDown" || key === "ArrowLeft")) act(-1);
      else return;
      e.preventDefault();
      e.stopPropagation();
    });
  }
  /** Pivot of a rotate element: cx / cy, the editor's rotation center, or the element center. */
  pivot(b) {
    if (b.pivot !== void 0 && b.pivot !== null) return b.pivot;
    const { cx, cy } = b.options;
    if (typeof cx === "number" && typeof cy === "number") return b.pivot = [cx, cy];
    const box = bbox(b.el);
    if (!box) return null;
    const tx = Number(b.el.getAttribute("inkscape:transform-center-x")) || 0;
    const ty = Number(b.el.getAttribute("inkscape:transform-center-y")) || 0;
    return b.pivot = [box.x + box.width / 2 + tx, box.y + box.height / 2 - ty];
  }
  apply(values) {
    for (const b of this.bindings) {
      const v = values[b.name];
      const o = b.options;
      switch (b.role) {
        case "text": {
          const target = b.el.querySelector("tspan") ?? b.el;
          const text = typeof v === "number" ? withUnit(formatValue(v, String(o.format)), String(o.unit)) : v === null || v === void 0 ? "—" : String(v);
          setText(target, text);
          break;
        }
        case "rotate": {
          const a = rotateAngle(v, o);
          const p = a === null ? null : this.pivot(b);
          if (a !== null && p) setAttr(b.el, "transform", `${b.base} rotate(${a.toFixed(2)} ${p[0]} ${p[1]})`.trim());
          break;
        }
        case "scale": {
          const f = fraction(v, o);
          const box = f === null ? null : bbox(b.el);
          if (f === null || !box) break;
          const t = o.edge === "bottom" || o.edge === "top" ? ((ay) => `translate(0 ${ay}) scale(1 ${f.toFixed(4)}) translate(0 ${-ay})`)(o.edge === "bottom" ? box.y + box.height : box.y) : ((ax) => `translate(${ax} 0) scale(${f.toFixed(4)} 1) translate(${-ax} 0)`)(o.edge === "left" ? box.x : box.x + box.width);
          setAttr(b.el, "transform", `${b.base} ${t}`.trim());
          break;
        }
        case "show":
          setAttr(b.el, "display", (o.eq === null ? truthy(v) : matches(String(o.eq), v)) ? null : "none");
          break;
        case "case":
          setAttr(b.el, "display", matches(b.name, values[b.state]) ? null : "none");
          break;
        case "color": {
          const on = o.eq === null ? truthy(v) : matches(String(o.eq), v);
          const c = safeColor(on ? o.on : o.off);
          if (c) b.el.style.setProperty("fill", c);
          break;
        }
        case "button":
          setAttr(b.el, "aria-pressed", String(truthy(v)));
          break;
        case "momentary":
          setAttr(b.el, "aria-pressed", String(truthy(v)));
          break;
        case "step":
          setAttr(b.el, "aria-valuenow", typeof v === "number" ? String(v) : null);
          setAttr(b.el, "aria-valuemin", String(o.min));
          setAttr(b.el, "aria-valuemax", String(o.max));
          break;
      }
      if (CONTROL_ROLES.includes(b.role)) {
        setAttr(b.el, "tabindex", this.interactive ? "0" : "-1");
        setAttr(b.el, "aria-disabled", this.interactive ? null : "true");
      }
    }
  }
  /** Entry fields of the step values (IND-124). */
  renderEntries(values) {
    const steps = /* @__PURE__ */ new Map();
    for (const b of this.bindings) if (b.role === "step" && !steps.has(b.name)) steps.set(b.name, b);
    const show = this.get("show_entries") && steps.size > 0;
    setHidden(this.entries, !show);
    if (!show) return;
    const key = JSON.stringify([...steps.keys()]);
    if (key !== this._entryKey) {
      this._entryKey = key;
      clear(this.entries);
      for (const [name, b] of steps) {
        const o = b.options;
        const input = html("input", { cls: "awi-entry", attrs: { type: "text", inputmode: "decimal", autocomplete: "off", spellcheck: "false", "data-lm-suppress-shortcuts": "true", "data-name": name } });
        const err = html("span", { cls: "awi-entry-msg", attrs: { role: "alert" } });
        const label = String(o.label || name);
        input.setAttribute("aria-label", `${label} (${formatValue(o.min, String(o.format))} to ${formatValue(o.max, String(o.format))})`);
        const commit = () => {
          const r = checkEntry(input.value, { min: o.min, max: o.max, step: o.step, unit: String(o.unit), format: String(o.format) });
          setText(err, r.ok ? "" : r.reason);
          if (r.ok) this.write(name, r.value);
        };
        input.addEventListener("keydown", (e) => {
          e.stopPropagation();
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setText(err, "");
            input.blur();
            this.schedule();
          }
        });
        input.addEventListener("change", commit);
        this.entries.appendChild(html("label", { cls: "awi-svp-entry" }, [html("span", { text: label }), input, html("span", { cls: "awi-entry-unit", text: String(o.unit) }), err]));
      }
    }
    for (const input of Array.from(this.entries.querySelectorAll("input"))) {
      const name = input.getAttribute("data-name");
      const b = steps.get(name);
      if (input.disabled !== !this.interactive) input.disabled = !this.interactive;
      if (document.activeElement !== input) {
        const v = values[name];
        input.value = typeof v === "number" ? formatValue(v, String(b.options.format)) : "";
      }
    }
  }
  draw() {
    const svgSource = this.get("svg");
    if (svgSource !== this._svgKey) {
      this._svgKey = svgSource;
      this._entryKey = "";
      this.build();
    }
    const values = this.values();
    this.apply(values);
    this.renderEntries(values);
    const [, h] = this.get("size");
    this.stage.style.height = `${Math.max(40, h - 34 - (this.entries.hidden ? 0 : this.entries.offsetHeight + 4))}px`;
    const kernel = this.get("problems") || [];
    const problems = kernel.length ? kernel : this.localProblems;
    setText(this.msg, problems.length ? `⚠ ${problems.length === 1 ? "1 problem" : `${problems.length} problems`}: ${problems.join("; ")}` : "");
    setHidden(this.msg, problems.length === 0);
    const names = [...new Set(this.bindings.filter((b) => b.role !== "case").map((b) => b.name))].sort();
    const described = names.map((n) => {
      const v = values[n];
      return `${n} ${typeof v === "number" ? formatValue(v, "%.4g") : v === void 0 || v === null ? "—" : String(v)}`;
    });
    setAttr(this.body, "aria-label", `${this.get("label") || "SVG panel"}${described.length ? `: ${described.join(", ")}` : ""}`);
  }
};

// js/src/contract/xy.ts
function xyValueAt(xs, ys, x) {
  const pts = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) if (Number.isFinite(xs[i]) && Number.isFinite(ys[i])) pts.push([xs[i], ys[i]]);
  if (!pts.length || !Number.isFinite(x)) return NaN;
  pts.sort((a, b) => a[0] - b[0]);
  if (x < pts[0][0] || x > pts[pts.length - 1][0]) return NaN;
  let k = 0;
  while (k < pts.length - 1 && pts[k + 1][0] <= x) k++;
  if (k === pts.length - 1 || pts[k][0] === x) return pts[k][1];
  const [x0, y0] = pts[k];
  const [x1, y1] = pts[k + 1];
  return y0 + (x - x0) / (x1 - x0) * (y1 - y0);
}

// js/src/core/buffers.ts
function bytesOf(b) {
  if (!b) return new ArrayBuffer(0);
  if (b instanceof ArrayBuffer) return b;
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}
var toFloat32 = (b) => new Float32Array(bytesOf(b));
var toUint8 = (b) => new Uint8Array(bytesOf(b));
var toFloat64 = (b) => new Float64Array(bytesOf(b));

// js/src/core/plot.ts
var PLOT_TRAITS = ["cursors", "cursor_values", "annotations", "export", "x_unit", "unit"];
function zoomedRanges(full, zoom) {
  if (!zoom) return full;
  const span = full.x[1] - full.x[0];
  const x = zoom.fx ? [full.x[0] + zoom.fx[0] * span, full.x[0] + zoom.fx[1] * span] : full.x;
  return { x, y: zoom.y || full.y };
}
var linearYAt = (y, f) => y[0] + f * (y[1] - y[0]);
function zoomFromRect(full, current, area, r, yAt = linearYAt) {
  const cur = zoomedRanges(full, current);
  const fx = (px) => (px - area.x) / area.w;
  const fy = (py) => 1 - (py - area.y) / area.h;
  const xa = cur.x[0] + Math.min(fx(r.x0), fx(r.x1)) * (cur.x[1] - cur.x[0]);
  const xb = cur.x[0] + Math.max(fx(r.x0), fx(r.x1)) * (cur.x[1] - cur.x[0]);
  const ya = yAt(cur.y, Math.min(fy(r.y0), fy(r.y1)));
  const yb = yAt(cur.y, Math.max(fy(r.y0), fy(r.y1)));
  const span = full.x[1] - full.x[0] || 1;
  return { fx: [(xa - full.x[0]) / span, (xb - full.x[0]) / span], y: [ya, yb] };
}
function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = html("a", { attrs: { href: url, download: filename } });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
var PlotView = class extends BaseView {
  constructor(model, el, traits = []) {
    super(model, el, [...PLOT_TRAITS, ...traits]);
    this.margin = { left: 52, right: 12, top: 8, bottom: 24 };
    this.exportBtns = [];
    this.zoom = null;
    this.tool = "none";
    this.dragCursor = null;
    this.zoomRect = null;
    this.canvas = html("canvas", { cls: "awi-canvas" });
    this.zoomBox = html("div", { cls: "awi-zoom-box" });
    this.zoomBox.hidden = true;
    this.body.append(this.canvas, this.zoomBox);
    this.body.setAttribute("role", "img");
    this.toolbar = html("div", { cls: "awi-toolbar", attrs: { role: "toolbar", "aria-label": "Graph tools" } });
    this.root.insertBefore(this.toolbar, this.body);
    this.cursorBar = html("div", { cls: "awi-cursor-bar", attrs: { role: "group", "aria-label": "Cursor positions" } });
    this.axesPanel = this.buildAxesPanel();
    this.root.insertBefore(this.axesPanel, this.body);
    this.legend = html("div", { cls: "awi-legend" });
    this.root.append(this.cursorBar, this.legend);
    this.buildToolbar();
    const c = this.canvas;
    c.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    c.addEventListener("pointermove", (e) => this.onHover(e));
    c.addEventListener("dblclick", () => this.resetZoom());
    c.addEventListener("wheel", (e) => this.onWheel(e), { passive: false });
  }
  /** Graph interactions (zoom, cursors) are allowed on indicators too. */
  get canInteract() {
    return !this.get("disabled") && this.stale === "live";
  }
  // -- toolbar -------------------------------------------------------------------
  buildToolbar() {
    const btn = (text, label, onClick) => {
      const b = html("button", { text, attrs: { type: "button", title: label, "aria-label": label } });
      b.addEventListener("click", onClick);
      this.toolbar.appendChild(b);
      return b;
    };
    this.zoomBtn = btn("⬚ Zoom", "Zoom tool: drag a rectangle", () => {
      this.tool = this.tool === "zoom" ? "none" : "zoom";
      this.schedule();
    });
    btn("⤢ Reset", "Restore the full view", () => this.resetZoom());
    btn("⌖ Cursor", "Add a cursor", () => this.addCursor());
    this.axesBtn = btn("↕ Axes", "Set the axis ranges", () => this.toggleAxesPanel());
    this.exportBtns = [btn("CSV", "Download data as CSV", () => this.exportCsv()), btn("PNG", "Download image as PNG", () => this.exportPng()), btn("SVG", "Download image as SVG", () => this.exportSvg())];
  }
  // -- axis ranges by form entry (CHART-108) --------------------------------------------
  buildAxesPanel() {
    const panel = html("div", { cls: "awi-axes-panel", attrs: { role: "group", "aria-label": "Axis ranges" } });
    panel.hidden = true;
    const field = (name) => {
      const f2 = html("input", { cls: "awi-entry", attrs: { type: "text", inputmode: "decimal", "aria-label": name, "data-lm-suppress-shortcuts": "true" } });
      f2.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
          e.preventDefault();
          this.applyAxes();
        } else if (e.key === "Escape") this.toggleAxesPanel(false);
      });
      return f2;
    };
    this.axisFields = { x0: field("X minimum"), x1: field("X maximum"), y0: field("Y minimum"), y1: field("Y maximum") };
    this.axisUnits = { x: html("span", { cls: "awi-entry-unit" }), y: html("span", { cls: "awi-entry-unit" }) };
    const apply = html("button", { text: "Apply", attrs: { type: "button" } });
    apply.addEventListener("click", () => this.applyAxes());
    const auto = html("button", { text: "Auto", attrs: { type: "button", title: "Full range and automatic scale" } });
    auto.addEventListener("click", () => this.autoAxes());
    this.axesMsg = html("div", { cls: "awi-entry-msg", attrs: { role: "alert" } });
    const f = this.axisFields;
    panel.append(
      html("span", { cls: "awi-axis-row" }, [html("b", { text: "X" }), f.x0, html("span", { text: "…" }), f.x1, this.axisUnits.x]),
      html("span", { cls: "awi-axis-row" }, [html("b", { text: "Y" }), f.y0, html("span", { text: "…" }), f.y1, this.axisUnits.y]),
      apply,
      auto,
      this.axesMsg
    );
    return panel;
  }
  toggleAxesPanel(open = this.axesPanel.hidden) {
    this.axesPanel.hidden = !open;
    this.axesBtn?.setAttribute("aria-pressed", String(open));
    if (!open) return;
    const r = this.ranges();
    const fmt = (v) => formatValue(v, "%.4g");
    const f = this.axisFields;
    [f.x0.value, f.x1.value, f.y0.value, f.y1.value] = [this.xText(r.x[0]), this.xText(r.x[1]), fmt(r.y[0]), fmt(r.y[1])];
    this.axisUnits.x.textContent = this.get("x_unit") || "";
    this.axisUnits.y.textContent = this.get("unit") || "";
    this.axesMsg.textContent = "";
    f.x0.focus();
  }
  /** Charts whose Y scale is a synchronized setting (WaveformChart). */
  get yIsSetting() {
    return this.get("autoscale_y") !== void 0;
  }
  applyAxes() {
    if (!this.canInteract) return;
    const f = this.axisFields;
    const unit = this.get("unit") || "";
    const [x0, x1] = [this.parseX(f.x0.value), this.parseX(f.x1.value)];
    const [y0, y1] = [parseEntry(f.y0.value, unit), parseEntry(f.y1.value, unit)];
    for (const [a, b, name] of [[x0, x1, "X"], [y0, y1, "Y"]]) {
      if (!Number.isFinite(a) || !Number.isFinite(b)) return this.axisError(`${name}: enter two numbers`);
      if (!(a < b)) return this.axisError(`${name}: the minimum must be below the maximum`);
    }
    this.axisError("");
    const full = this.fullRange();
    const span = full.x[1] - full.x[0] || 1;
    const zoom = { fx: [(x0 - full.x[0]) / span, (x1 - full.x[0]) / span], y: [y0, y1] };
    if (this.yIsSetting) {
      zoom.y = null;
      const m = this.model;
      m.set("autoscale_y", false);
      m.set("y_min", y0);
      m.set("y_max", y1);
      m.save_changes();
    }
    this.zoom = zoom;
    this.schedule();
  }
  autoAxes() {
    if (!this.canInteract) return;
    this.zoom = null;
    if (this.yIsSetting) {
      const m = this.model;
      m.set("autoscale_y", true);
      m.save_changes();
    }
    this.axisError("");
    this.toggleAxesPanel(false);
    this.schedule();
  }
  axisError(reason) {
    this.axesMsg.textContent = reason;
    for (const field of Object.values(this.axisFields)) field.toggleAttribute("aria-invalid", !!reason);
  }
  /** Cursor position fields (API-014); fields being edited are left alone. */
  renderCursorFields() {
    const cursors = this.get("cursors");
    const fields = [...this.cursorBar.querySelectorAll("input")];
    if (fields.length !== cursors.length) {
      clear(this.cursorBar);
      cursors.forEach((_cur, i) => {
        const field = html("input", { cls: "awi-entry", attrs: { type: "text", inputmode: "decimal", "data-lm-suppress-shortcuts": "true" } });
        const msg = html("span", { cls: "awi-entry-msg", attrs: { role: "alert" } });
        field.addEventListener("keydown", (e) => {
          e.stopPropagation();
          if (e.key === "Enter") {
            e.preventDefault();
            this.setCursorFromField(i, field, msg);
          } else if (e.key === "Escape") {
            field.blur();
            this.schedule();
          }
        });
        field.addEventListener("blur", () => this.schedule());
        const name = html("span", { cls: "awi-cursor-name" });
        this.cursorBar.appendChild(html("label", { cls: "awi-cursor-field" }, [name, field, html("span", { cls: "awi-entry-unit" }), msg]));
      });
    }
    const unit = this.get("x_unit") || "";
    [...this.cursorBar.children].forEach((row, i) => {
      const cur = cursors[i];
      const [name, field, unitEl] = [...row.children];
      setText(name, `${cur.name || `C${i + 1}`} x =`);
      setText(unitEl, unit);
      setAttr(field, "aria-label", `Position of cursor ${cur.name || i + 1}`);
      if (field.disabled !== !this.canInteract) field.disabled = !this.canInteract;
      if (document.activeElement !== field) field.value = this.xText(parseNumber(cur.x));
    });
    setHidden(this.cursorBar, cursors.length === 0);
  }
  setCursorFromField(i, field, msg) {
    if (!this.canInteract) return;
    const r = this.checkX(field.value);
    msg.textContent = r.ok ? "" : r.reason ?? "";
    field.toggleAttribute("aria-invalid", !r.ok);
    if (!r.ok || r.value === void 0) return;
    const x = r.value;
    this.setCursors(this.get("cursors").map((cur, k) => k === i ? { ...cur, x } : cur));
    field.blur();
    this.schedule();
  }
  setCursors(cursors) {
    this.model.set("cursors", cursors);
    this.model.save_changes();
  }
  // -- x-axis values as text (time axes override these) ---------------------------------
  /** Text of an x value in the entry fields. */
  xText(v) {
    return formatValue(v, "%.4g");
  }
  /** x value typed in an entry field (NaN if not understood). */
  parseX(text) {
    return parseEntry(text, this.get("x_unit") || "");
  }
  /** Check a typed x value against the full x range (API-014). */
  checkX(text) {
    const [a, b] = this.fullRange().x;
    return checkEntry(text, { min: Math.min(a, b), max: Math.max(a, b), unit: this.get("x_unit") || "", format: "%.4g" });
  }
  /** Tick positions of the x axis. */
  xTicks(a, b) {
    return niceTicks(a, b, 5);
  }
  resetZoom() {
    this.zoom = null;
    this.schedule();
  }
  // -- geometry --------------------------------------------------------------------
  area() {
    const [w, h] = this.get("size");
    const m = this.margin;
    return { x: m.left, y: m.top, w: Math.max(10, w - m.left - m.right), h: Math.max(10, h - m.top - m.bottom) };
  }
  /** Subclasses: full data ranges. */
  fullRange() {
    return { x: [0, 1], y: [0, 1] };
  }
  ranges() {
    return zoomedRanges(this.fullRange(), this.zoom);
  }
  /** Fraction of the Y range at value `y` (subclasses: logarithmic axes). */
  yFrac(y, range) {
    return (y - range[0]) / (range[1] - range[0] || 1);
  }
  /** Value at fraction `f` of the Y range (inverse of yFrac). */
  yAt(range, f) {
    return linearYAt(range, f);
  }
  /** Tick positions of the Y axis. */
  yTicks(a, b) {
    return niceTicks(a, b, 4);
  }
  mappers(area, r) {
    const X = (x) => area.x + (x - r.x[0]) / (r.x[1] - r.x[0] || 1) * area.w;
    const Y = (y) => area.y + area.h - this.yFrac(y, r.y) * area.h;
    const invX = (px) => r.x[0] + (px - area.x) / area.w * (r.x[1] - r.x[0]);
    return { X, Y, invX };
  }
  colors() {
    const cs = getComputedStyle(this.root);
    const v = (n, d) => cs.getPropertyValue(n).trim() || d;
    return {
      fg: v("--awi-fg", "#1f2937"),
      muted: v("--awi-muted", "#6b7280"),
      grid: v("--awi-grid", "#e5e7eb"),
      bg: v("--awi-plot-bg", "#ffffff"),
      accent: v("--awi-accent", "#2563eb"),
      trace: (i) => v(`--awi-trace-${i % 8}`, "#2563eb")
    };
  }
  // -- interaction -------------------------------------------------------------------
  localPoint(e) {
    const r = this.canvas.getBoundingClientRect();
    const [w, h] = this.get("size");
    return { x: (e.clientX - r.left) * w / (r.width || w), y: (e.clientY - r.top) * h / (r.height || h) };
  }
  cursorAt(px) {
    const { X } = this.mappers(this.area(), this.ranges());
    const cursors = this.get("cursors");
    for (let i = cursors.length - 1; i >= 0; i--) {
      if (Math.abs(X(parseNumber(cursors[i].x)) - px) <= 5) return i;
    }
    return -1;
  }
  onHover(e) {
    if (this.dragCursor || this.zoomRect) return;
    const p = this.localPoint(e);
    this.canvas.style.cursor = this.canInteract && this.cursorAt(p.x) >= 0 ? "ew-resize" : this.tool === "zoom" ? "crosshair" : "";
  }
  onPointerDown(e) {
    if (!this.canInteract || e.button !== 0) return;
    const p = this.localPoint(e);
    const area = this.area();
    const idx = this.cursorAt(p.x);
    const c = this.canvas;
    c.setPointerCapture?.(e.pointerId);
    let move;
    let up;
    if (idx >= 0) {
      const { invX } = this.mappers(area, this.ranges());
      const drag = this.dragCursor = { index: idx, x: invX(p.x) };
      move = (ev) => {
        const q = this.localPoint(ev);
        const clamped = Math.min(area.x + area.w, Math.max(area.x, q.x));
        drag.x = this.mappers(area, this.ranges()).invX(clamped);
        this.schedule();
      };
      up = () => {
        const cursors = this.get("cursors").map((cur, i) => i === drag.index ? { ...cur, x: drag.x } : cur);
        this.dragCursor = null;
        this.setCursors(cursors);
        this.schedule();
      };
    } else if (this.tool === "zoom") {
      const rect = this.zoomRect = { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
      move = (ev) => {
        const q = this.localPoint(ev);
        rect.x1 = Math.min(area.x + area.w, Math.max(area.x, q.x));
        rect.y1 = Math.min(area.y + area.h, Math.max(area.y, q.y));
        this.showZoomBox();
      };
      up = () => {
        this.zoomRect = null;
        this.zoomBox.hidden = true;
        if (Math.abs(rect.x1 - rect.x0) > 4 && Math.abs(rect.y1 - rect.y0) > 4) {
          this.zoom = zoomFromRect(this.fullRange(), this.zoom, area, rect, (y, f) => this.yAt(y, f));
          this.schedule();
        }
      };
    } else if (this.zoom) {
      const x0 = p.x;
      const fx0 = this.zoom.fx ? [this.zoom.fx[0], this.zoom.fx[1]] : [0, 1];
      const z0 = { ...this.zoom };
      move = (ev) => {
        const span = fx0[1] - fx0[0];
        let d = -(this.localPoint(ev).x - x0) / area.w * span;
        d = Math.max(-fx0[0], Math.min(1 - fx0[1], d));
        this.zoom = { ...z0, fx: [fx0[0] + d, fx0[1] + d] };
        this.schedule();
      };
      up = () => {
      };
    } else {
      return;
    }
    const end = () => {
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", end);
      c.removeEventListener("pointercancel", end);
      up();
    };
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", end);
    c.addEventListener("pointercancel", end);
  }
  showZoomBox() {
    const r = this.zoomRect;
    if (!r) return;
    const b = this.zoomBox;
    const cr = this.canvas.getBoundingClientRect();
    const [w] = this.get("size");
    const k = (cr.width || w) / w;
    b.hidden = false;
    b.style.left = `${Math.min(r.x0, r.x1) * k}px`;
    b.style.top = `${Math.min(r.y0, r.y1) * k}px`;
    b.style.width = `${Math.abs(r.x1 - r.x0) * k}px`;
    b.style.height = `${Math.abs(r.y1 - r.y0) * k}px`;
  }
  onWheel(e) {
    if (!this.canInteract || !(e.ctrlKey || this.tool === "zoom" || this.zoom)) return;
    e.preventDefault();
    const area = this.area();
    const fx = Math.min(1, Math.max(0, (this.localPoint(e).x - area.x) / area.w));
    const [a, b] = this.zoom?.fx || [0, 1];
    const at = a + fx * (b - a);
    const k = e.deltaY < 0 ? 0.8 : 1.25;
    const na = Math.max(0, at - (at - a) * k);
    const nb = Math.min(1, at + (b - at) * k);
    const y = this.zoom?.y || null;
    this.zoom = nb - na >= 0.999 && !y ? null : { fx: [na, nb], y };
    this.schedule();
  }
  addCursor() {
    if (!this.canInteract) return;
    const r = this.ranges();
    const cursors = this.get("cursors");
    this.setCursors([...cursors, { x: (r.x[0] + r.x[1]) / 2, name: `C${cursors.length + 1}`, color: "" }]);
    this.schedule();
  }
  // -- drawing --------------------------------------------------------------------------
  prepareCanvas() {
    const [w, h] = this.get("size");
    const dpr = typeof devicePixelRatio !== "undefined" && devicePixelRatio || 1;
    const c = this.canvas;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    }
    let ctx = null;
    try {
      ctx = c.getContext?.("2d") ?? null;
    } catch {
      ctx = null;
    }
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }
  /** Label of an x-axis value (subclasses may override). */
  xLabel(v) {
    const u = this.get("x_unit");
    const t = formatValue(v, "%.3g");
    return u ? `${t} ${u}` : t;
  }
  drawAxes(ctx, area, r, colors, { yTicks = true } = {}) {
    const { X, Y } = this.mappers(area, r);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(area.x, area.y, area.w, area.h);
    ctx.font = "10px system-ui, sans-serif";
    ctx.strokeStyle = colors.grid;
    ctx.fillStyle = colors.fg;
    ctx.lineWidth = 1;
    if (yTicks) {
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (const v of this.yTicks(r.y[0], r.y[1])) {
        const y = Math.round(Y(v)) + 0.5;
        ctx.beginPath();
        ctx.moveTo(area.x, y);
        ctx.lineTo(area.x + area.w, y);
        ctx.stroke();
        ctx.fillText(formatValue(v, "%.3g"), area.x - 4, y);
      }
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (const v of this.xTicks(r.x[0], r.x[1])) {
      const x = Math.round(X(v)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(x, area.y);
      ctx.lineTo(x, area.y + area.h);
      ctx.stroke();
      ctx.fillText(this.xLabel(v), x, area.y + area.h + 4);
    }
  }
  /** Values under a cursor, as display strings (subclasses). */
  cursorText(_x) {
    return "";
  }
  drawOverlays(ctx, area, r, colors) {
    const { X, Y } = this.mappers(area, r);
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    for (const a of this.get("annotations")) {
      const x = X(parseNumber(a.x));
      const y = Y(parseNumber(a.y));
      if (!Number.isFinite(x) || !Number.isFinite(y) || x < area.x || x > area.x + area.w || y < area.y || y > area.y + area.h) continue;
      ctx.fillStyle = safeColor(a.color) || colors.fg;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText(String(a.text ?? ""), x + 5, y - 3);
    }
    this.get("cursors").forEach((c, i) => {
      const cx = this.dragCursor?.index === i ? this.dragCursor.x : parseNumber(c.x);
      const x = Math.round(X(cx)) + 0.5;
      if (x < area.x || x > area.x + area.w) return;
      const col = safeColor(c.color) || colors.accent;
      ctx.strokeStyle = col;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x, area.y);
      ctx.lineTo(x, area.y + area.h);
      ctx.stroke();
      ctx.setLineDash([]);
      const label = `${c.name || `C${i + 1}`}: ${this.xLabel(cx)} ${this.cursorText(cx)}`.trim();
      ctx.font = "10px system-ui, sans-serif";
      const tw = ctx.measureText(label).width + 8;
      const lx = Math.min(x + 3, area.x + area.w - tw);
      const ly = area.y + 2 + i * 14;
      ctx.fillStyle = colors.bg;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(lx, ly, tw, 13);
      ctx.globalAlpha = 1;
      ctx.fillStyle = col;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(label, lx + 4, ly + 1);
    });
    ctx.strokeStyle = colors.fg;
    ctx.strokeRect(area.x + 0.5, area.y + 0.5, area.w - 1, area.h - 1);
    if (this.zoom) {
      ctx.fillStyle = colors.accent;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("🔍 zoomed (double-click to reset)", area.x + 4, area.y + area.h - 14);
    }
  }
  renderCommon() {
    super.renderCommon();
    this.renderCursorFields();
    setAttr(this.zoomBtn, "aria-pressed", String(this.tool === "zoom"));
    for (const b of this.exportBtns) setHidden(b, !this.get("export"));
  }
  // -- export (CHART-107) ------------------------------------------------------------------
  /** Subclasses: rows for CSV export, first row is the header. */
  csvRows() {
    return [];
  }
  exportCsv() {
    const esc = (v) => {
      const s = typeof v === "number" ? Number.isFinite(v) ? String(v) : "" : String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const text = this.csvRows().map((row) => row.map(esc).join(",")).join("\n");
    download(new Blob([text], { type: "text/csv" }), `${this.get("label") || this.kind}.csv`);
  }
  exportPng() {
    this.canvas.toBlob((b) => b && download(b, `${this.get("label") || this.kind}.png`), "image/png");
  }
  /** Subclasses: SVG elements (paths) for the plot content. */
  svgContent(_area, _ranges, _colors, _el) {
    return [];
  }
  buildSvg() {
    const [w, h] = this.get("size");
    const NS = "http://www.w3.org/2000/svg";
    const el = (tag, attrs = {}, text) => {
      const n = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
      if (text !== void 0) n.textContent = text;
      return n;
    };
    const colors = this.colors();
    const area = this.area();
    const r = this.ranges();
    const { X, Y } = this.mappers(area, r);
    const root = el("svg", { xmlns: NS, width: w, height: h, viewBox: `0 0 ${w} ${h}`, "font-family": "sans-serif", "font-size": 10 });
    root.appendChild(el("rect", { x: area.x, y: area.y, width: area.w, height: area.h, fill: colors.bg, stroke: colors.fg }));
    for (const v of this.yTicks(r.y[0], r.y[1])) {
      root.appendChild(el("line", { x1: area.x, x2: area.x + area.w, y1: Y(v), y2: Y(v), stroke: colors.grid }));
      root.appendChild(el("text", { x: area.x - 4, y: Y(v), "text-anchor": "end", "dominant-baseline": "middle", fill: colors.fg }, formatValue(v, "%.3g")));
    }
    for (const v of this.xTicks(r.x[0], r.x[1])) {
      root.appendChild(el("line", { x1: X(v), x2: X(v), y1: area.y, y2: area.y + area.h, stroke: colors.grid }));
      root.appendChild(el("text", { x: X(v), y: area.y + area.h + 14, "text-anchor": "middle", fill: colors.fg }, this.xLabel(v)));
    }
    const clipId = `${this.id}-clip`;
    const defs = el("defs");
    const cp = el("clipPath", { id: clipId });
    cp.appendChild(el("rect", { x: area.x, y: area.y, width: area.w, height: area.h }));
    defs.appendChild(cp);
    root.appendChild(defs);
    const g = el("g", { "clip-path": `url(#${clipId})` });
    for (const item of this.svgContent(area, r, colors, el)) g.appendChild(item);
    root.appendChild(g);
    for (const a of this.get("annotations")) {
      root.appendChild(el("text", { x: X(parseNumber(a.x)) + 5, y: Y(parseNumber(a.y)) - 3, fill: safeColor(a.color) || colors.fg }, String(a.text ?? "")));
    }
    return root;
  }
  exportSvg() {
    const text = new XMLSerializer().serializeToString(this.buildSvg());
    download(new Blob([text], { type: "image/svg+xml" }), `${this.get("label") || this.kind}.svg`);
  }
};

// js/src/contract/waveform.ts
var Ring = class _Ring {
  constructor(capacity, k) {
    /** Samples appended since the last clear. */
    this.total = 0;
    this.capacity = capacity;
    this.k = k;
    this.data = Array.from({ length: k }, () => new Float32Array(capacity).fill(NaN));
  }
  /** Append rows from a row-major array of n rows (only the last `capacity` are kept). */
  push(rows, n) {
    const { capacity, k } = this;
    const skip = Math.max(0, n - capacity);
    for (let i = skip; i < n; i++) {
      const slot = (this.total + i) % capacity;
      for (let j = 0; j < k; j++) this.data[j][slot] = rows[i * k + j];
    }
    this.total += n;
  }
  /** True when absolute sample index `idx` is still buffered. */
  has(idx) {
    return idx >= 0 && idx < this.total && idx >= this.total - this.capacity;
  }
  /** Value of trace j at absolute sample index idx (NaN if no longer buffered). */
  at(j, idx) {
    return this.has(idx) ? this.data[j][idx % this.capacity] : NaN;
  }
  copy() {
    const r = new _Ring(this.capacity, this.k);
    r.data = this.data.map((d) => d.slice());
    r.total = this.total;
    return r;
  }
};
function viewWindow(mode, total, history) {
  if (mode === "scope") {
    const start2 = total === 0 ? 0 : Math.floor((total - 1) / history) * history;
    return { start: start2, end: total, xOf: (i) => i - start2, cursor: null };
  }
  if (mode === "sweep") {
    const start2 = Math.max(0, total - history);
    return { start: start2, end: total, xOf: (i) => i % history, cursor: total % history };
  }
  const start = Math.max(0, total - history);
  return { start, end: total, xOf: (i) => i - (total - history), cursor: null };
}
function sampleIndexAt(x, { mode, dt, total, history }) {
  const i = dt ? x / dt : 0;
  if (mode === "sweep" && total) {
    const last = total - 1;
    const slot = (i % history + history) % history;
    return last - ((last - slot) % history + history) % history;
  }
  return i;
}
function valuesAt(ring, x, { mode, dt }) {
  const i = sampleIndexAt(x, { mode, dt, total: ring.total, history: ring.capacity });
  const i0 = Math.floor(i);
  const f = i - i0;
  return Array.from({ length: ring.k }, (_, j) => {
    if (!ring.has(i0)) return NaN;
    const a = ring.at(j, i0);
    if (f === 0 || !ring.has(i0 + 1)) return a;
    return a * (1 - f) + ring.at(j, i0 + 1) * f;
  });
}

// js/src/widgets/chart.ts
var TRAITS5 = ["history", "n_traces", "update_mode", "y_min", "y_max", "autoscale_y", "paused", "dt", "traces", "show_legend", "y_scale", "y2_min", "y2_max", "autoscale_y2", "y2_unit"];
function drawLegend(legend, entries, show) {
  clear(legend);
  legend.hidden = !show || entries.length < 2;
  if (legend.hidden) return;
  for (const t of entries) {
    const sw = html("span", { cls: "awi-swatch" });
    sw.style.background = t.color;
    const name = t.right ? `${t.name} (right axis)` : t.name;
    legend.appendChild(html("span", { cls: t.visible ? "awi-legend-item" : "awi-legend-item awi-hidden-trace" }, [sw, document.createTextNode(name)]));
  }
}
function traceStyle(traces, j, colors) {
  const all = Array.isArray(traces) ? traces : [];
  const t = all[j] && typeof all[j] === "object" ? all[j] : {};
  return {
    name: typeof t.name === "string" ? t.name : `trace ${j}`,
    color: safeColor(t.color) || colors.trace(j),
    width: Number(t.width) > 0 ? Number(t.width) : 1.5,
    visible: t.visible !== false,
    right: t.axis === "right"
  };
}
var ChartView = class extends PlotView {
  constructor(model, el) {
    super(model, el, TRAITS5);
    /** Full ranges of the last ranges() call (the secondary axis follows the Y zoom). */
    this.full = { x: [0, 1], y: [0, 1] };
    /** Ring snapshot while paused (CHART-009). */
    this.frozen = null;
    this.yRange = [this.get("y_min"), this.get("y_max")];
    this.y2Range = [this.get("y2_min"), this.get("y2_max")];
    this.resetRing();
    this.listen("msg:custom", (msg, buffers) => this.onMessage(msg, buffers));
    this.listen("change:history", () => this.resync());
    this.listen("change:n_traces", () => this.resync());
    this.listen("change:paused", () => {
      this.frozen = this.get("paused") ? this.ring.copy() : null;
    });
    this.model.send({ type: "sync_request" });
  }
  resetRing() {
    this.ring = new Ring(this.get("history"), this.get("n_traces"));
  }
  resync() {
    this.resetRing();
    this.schedule();
  }
  /** append / snapshot / clear messages (see waveformchart.schema.json). */
  onMessage(msg, buffers) {
    if (!msg || typeof msg !== "object") return;
    const m = msg;
    const n = Math.max(0, Math.floor(Number(m.n_points) || 0));
    const total = Math.max(0, Math.floor(Number(m.total) || 0));
    const rows = () => {
      const data = toFloat32(buffers?.[0]);
      return [data, Math.min(n, Math.floor(data.length / this.ring.k))];
    };
    if (m.type === "clear") {
      this.resetRing();
    } else if (m.type === "snapshot") {
      this.resetRing();
      const [data, k] = rows();
      this.ring.total = Math.max(0, total - n);
      this.ring.push(data, k);
    } else if (m.type === "append") {
      const [data, k] = rows();
      if (this.ring.total < total - n) this.ring.total = total - n;
      this.ring.push(data, k);
    } else {
      return;
    }
    this.schedule();
  }
  get view() {
    return this.frozen || this.ring;
  }
  get dt() {
    return this.get("dt") || 1;
  }
  style(j, colors) {
    return traceStyle(this.get("traces"), j, colors);
  }
  /** x-axis position (axis units) of absolute sample i. */
  axisX(i) {
    const ring = this.view;
    return (this.get("update_mode") === "sweep" ? i % ring.capacity : i) * this.dt;
  }
  fullRange() {
    const ring = this.view;
    const history = ring.capacity;
    const mode = this.get("update_mode");
    const win = viewWindow(mode, ring.total, history);
    const x0 = mode === "strip" ? ring.total - history : mode === "scope" ? win.start : 0;
    const log = this.isLog;
    const colors = this._colors || this.colors();
    const extent = (right) => {
      let lo = Infinity;
      let hi = -Infinity;
      for (let j = 0; j < ring.k; j++) {
        const t = this.style(j, colors);
        if (!t.visible || t.right !== right) continue;
        for (let i = win.start; i < win.end; i++) {
          const v = ring.at(j, i);
          if (Number.isFinite(v) && (right || !log || v > 0)) {
            if (v < lo) lo = v;
            if (v > hi) hi = v;
          }
        }
      }
      return [lo, hi];
    };
    if (this.get("autoscale_y")) {
      const [lo, hi] = extent(false);
      if (log) this.yRange = Number.isFinite(lo) ? logRange(lo, hi, true) : logRange(this.get("y_min"), this.get("y_max"));
      else this.yRange = autoscale(this.yRange, lo, hi);
    } else {
      const lo = this.get("y_min");
      const hi = this.get("y_max");
      this.yRange = log ? logRange(lo, hi) : [lo, hi];
    }
    if (this.hasRightAxis(colors) && this.get("autoscale_y2")) {
      const [lo, hi] = extent(true);
      this.y2Range = autoscale(this.y2Range, lo, hi);
    } else {
      this.y2Range = [this.get("y2_min"), this.get("y2_max")];
    }
    return { x: [x0 * this.dt, (x0 + history) * this.dt], y: this.yRange };
  }
  get isLog() {
    return this.get("y_scale") === "log";
  }
  hasRightAxis(colors = this._colors || this.colors()) {
    for (let j = 0; j < this.view.k; j++) if (this.style(j, colors).right) return true;
    return false;
  }
  area() {
    this.margin.right = this.hasRightAxis() ? 52 : 12;
    return super.area();
  }
  ranges() {
    this.full = this.fullRange();
    return zoomedRanges(this.full, this.zoom);
  }
  yFrac(y, range) {
    return this.isLog ? logFrac(y, range) : super.yFrac(y, range);
  }
  yAt(range, f) {
    return this.isLog ? logAt(range, f) : super.yAt(range, f);
  }
  yTicks(a, b) {
    return this.isLog ? logTicks(a, b) : super.yTicks(a, b);
  }
  /** Displayed range of the secondary axis: its full range cut as the Y zoom cuts the left one. */
  y2Shown(r) {
    const f0 = this.yFrac(r.y[0], this.full.y);
    const f1 = this.yFrac(r.y[1], this.full.y);
    if (!Number.isFinite(f0) || !Number.isFinite(f1)) return this.y2Range;
    return [linearYAt(this.y2Range, f0), linearYAt(this.y2Range, f1)];
  }
  /** Pixel y of each trace: the left axis, or the linear secondary axis (IND-117). */
  traceY(area, r, t) {
    if (!t.right) return this.mappers(area, r).Y;
    const y2 = this.y2Shown(r);
    return (v) => area.y + area.h - (v - y2[0]) / (y2[1] - y2[0] || 1) * area.h;
  }
  /** Ticks of the secondary axis with their pixel y. */
  y2Ticks(area, r) {
    const y2 = this.y2Shown(r);
    const Y = this.traceY(area, r, { name: "", color: "", width: 1, visible: true, right: true });
    return niceTicks(Math.min(y2[0], y2[1]), Math.max(y2[0], y2[1]), 4).map((v) => [v, Y(v)]);
  }
  /** Whether sample v of a trace can be drawn (a log axis has no value <= 0). */
  drawable(v, t) {
    return Number.isFinite(v) && (t.right || !this.isLog || v > 0);
  }
  drawAxes(ctx, area, r, colors, opts = {}) {
    super.drawAxes(ctx, area, r, colors, opts);
    if (!this.hasRightAxis(colors)) return;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colors.fg;
    ctx.strokeStyle = colors.fg;
    const x = area.x + area.w;
    for (const [v, y] of this.y2Ticks(area, r)) {
      if (y < area.y - 1 || y > area.y + area.h + 1) continue;
      ctx.beginPath();
      ctx.moveTo(x, Math.round(y) + 0.5);
      ctx.lineTo(x + 4, Math.round(y) + 0.5);
      ctx.stroke();
      ctx.fillText(formatValue(v, "%.3g"), x + 6, y);
    }
    const unit = this.get("y2_unit");
    if (unit) {
      ctx.textBaseline = "bottom";
      ctx.textAlign = "right";
      ctx.fillText(unit, area.x + area.w + this.margin.right - 2, area.y + area.h + this.margin.bottom - 2);
    }
  }
  buildSvg() {
    const root = super.buildSvg();
    const area = this.area();
    const r = this.ranges();
    if (!this.hasRightAxis()) return root;
    const NS = "http://www.w3.org/2000/svg";
    for (const [v, y] of this.y2Ticks(area, r)) {
      const t = document.createElementNS(NS, "text");
      for (const [k, a] of Object.entries({ x: area.x + area.w + 6, y, "dominant-baseline": "middle", fill: this.colors().fg })) t.setAttribute(k, String(a));
      t.textContent = formatValue(v, "%.3g");
      root.appendChild(t);
    }
    return root;
  }
  /** Iterate the displayed samples of trace j: cb(axisX, value, breakBefore). */
  forEachSample(j, r, cb) {
    const ring = this.view;
    const mode = this.get("update_mode");
    const win = viewWindow(mode, ring.total, ring.capacity);
    const i0 = Math.max(win.start, Math.floor(r.x[0] / this.dt) - 1);
    const i1 = Math.min(win.end, Math.ceil(r.x[1] / this.dt) + 2);
    const all = mode === "sweep";
    for (let i = all ? win.start : i0; i < (all ? win.end : i1); i++) {
      cb(this.axisX(i), ring.at(j, i), mode === "sweep" && i > win.start && i % ring.capacity === 0);
    }
  }
  cursorText(x) {
    const colors = this._colors || this.colors();
    const unit = this.get("unit");
    const vals = valuesAt(this.view, x, { mode: this.get("update_mode"), dt: this.dt }).map((v) => formatValue(v, "%.4g"));
    if (!this.hasRightAxis(colors)) return `→ ${vals.join(", ")}${unit ? ` ${unit}` : ""}`;
    const y2Unit = this.get("y2_unit");
    const withUnit2 = (v, u) => u ? `${v} ${u}` : v;
    return `→ ${vals.map((v, j) => withUnit2(v, this.style(j, colors).right ? y2Unit : unit)).join(", ")}`;
  }
  draw() {
    const ring = this.view;
    const colors = this._colors = this.colors();
    const latest = Array.from({ length: this.ring.k }, (_, j) => formatValue(this.ring.at(j, this.ring.total - 1), "%.4g"));
    setAttr(this.body, "aria-label", `${this.get("label") || "Waveform chart"}: latest ${latest.join(", ")} ${this.get("unit") || ""}`.trim());
    const styles = Array.from({ length: ring.k }, (_, j) => this.style(j, colors));
    drawLegend(this.legend, styles, this.get("show_legend"));
    const ctx = this.prepareCanvas();
    if (!ctx) return;
    const [w, h] = this.get("size");
    ctx.clearRect(0, 0, w, h);
    const area = this.area();
    const r = this.ranges();
    this.drawAxes(ctx, area, r, colors);
    const { X } = this.mappers(area, r);
    ctx.save();
    ctx.beginPath();
    ctx.rect(area.x, area.y, area.w, area.h);
    ctx.clip();
    const perPixel = (r.x[1] - r.x[0]) / this.dt / area.w;
    for (let j = 0; j < ring.k; j++) {
      const t = styles[j];
      if (!t.visible) continue;
      const Y = this.traceY(area, r, t);
      ctx.strokeStyle = t.color;
      ctx.lineWidth = t.width;
      ctx.beginPath();
      let pen = false;
      let col = null;
      let lo = 0;
      let hi = 0;
      const flush = () => {
        if (col === null) return;
        ctx.lineTo(col + 0.5, Y(lo));
        if (hi !== lo) ctx.lineTo(col + 0.5, Y(hi));
        col = null;
      };
      this.forEachSample(j, r, (ax, v, brk) => {
        const ok = this.drawable(v, t);
        if (!ok || brk) {
          flush();
          pen = false;
          if (!ok) return;
        }
        const x = X(ax);
        if (!pen) {
          ctx.moveTo(x, Y(v));
          pen = true;
          return;
        }
        if (perPixel <= 2) {
          ctx.lineTo(x, Y(v));
          return;
        }
        const c = Math.floor(x);
        if (c !== col) {
          flush();
          col = c;
          lo = v;
          hi = v;
        } else {
          if (v < lo) lo = v;
          if (v > hi) hi = v;
        }
      });
      flush();
      ctx.stroke();
    }
    const win = viewWindow(this.get("update_mode"), ring.total, ring.capacity);
    if (win.cursor !== null && !this.get("paused")) {
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1;
      const x = Math.round(X(win.cursor * this.dt)) + 0.5;
      ctx.beginPath();
      ctx.moveTo(x, area.y);
      ctx.lineTo(x, area.y + area.h);
      ctx.stroke();
    }
    ctx.restore();
    this.drawOverlays(ctx, area, r, colors);
    if (this.get("paused")) {
      ctx.fillStyle = colors.accent;
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText("❚❚ PAUSED", area.x + area.w - 6, area.y + 4);
    }
  }
  csvRows() {
    const ring = this.view;
    const colors = this.colors();
    const unit = this.get("x_unit");
    const header = [`x${unit ? ` (${unit})` : ""}`, ...Array.from({ length: ring.k }, (_, j) => this.style(j, colors).name)];
    const r = this.ranges();
    const rows = [header];
    const cols = Array.from({ length: ring.k }, () => []);
    const xs = [];
    for (let j = 0; j < ring.k; j++) {
      this.forEachSample(j, r, (ax, v) => {
        if (ax < r.x[0] || ax > r.x[1]) return;
        if (j === 0) xs.push(ax);
        cols[j].push(v);
      });
    }
    xs.forEach((x, n) => rows.push([x, ...cols.map((c) => c[n])]));
    return rows;
  }
  svgContent(area, r, colors, el) {
    const { X } = this.mappers(area, r);
    const out = [];
    for (let j = 0; j < this.view.k; j++) {
      const t = this.style(j, colors);
      if (!t.visible) continue;
      const Y = this.traceY(area, r, t);
      let d = "";
      let pen = false;
      this.forEachSample(j, r, (ax, v, brk) => {
        const ok = this.drawable(v, t);
        if (!ok || brk) pen = false;
        if (!ok) return;
        d += `${pen ? "L" : "M"}${X(ax).toFixed(1)} ${Y(v).toFixed(1)}`;
        pen = true;
      });
      out.push(el("path", { d, fill: "none", stroke: t.color, "stroke-width": t.width }));
    }
    return out;
  }
};

// js/src/widgets/xygraph.ts
var TRAITS6 = ["series", "x_min", "x_max", "y_min", "y_max", "show_legend"];
function dataRange(arrays, pad5 = 0.05) {
  let lo = Infinity;
  let hi = -Infinity;
  for (const a of arrays) {
    for (let i = 0; i < a.length; i++) {
      if (!Number.isFinite(a[i])) continue;
      lo = Math.min(lo, a[i]);
      hi = Math.max(hi, a[i]);
    }
  }
  if (!(hi >= lo)) return [0, 1];
  const span = hi - lo || Math.abs(hi) || 1;
  return [lo - pad5 * span, hi + pad5 * span];
}
var XYView = class extends PlotView {
  constructor(model, el) {
    super(model, el, TRAITS6);
    this.sets = /* @__PURE__ */ new Map();
    this.listen("msg:custom", (msg, buffers) => this.onMessage(msg, buffers));
    this.model.send({ type: "sync_request" });
  }
  /** data messages (see xygraph.schema.json); sizes are bounded by the buffers received. */
  onMessage(msg, buffers) {
    if (!msg || typeof msg !== "object" || msg.type !== "data") return;
    const m = msg;
    if (m.clear) this.sets.clear();
    (Array.isArray(m.sets) ? m.sets : []).forEach((entry, k) => {
      if (!Array.isArray(entry)) return;
      const name = String(entry[0]);
      const n = Math.max(0, Math.floor(Number(entry[1]) || 0));
      const x = toFloat64(buffers?.[2 * k]);
      const y = toFloat64(buffers?.[2 * k + 1]);
      const count2 = Math.min(n, x.length, y.length);
      this.sets.set(name, { x: x.subarray(0, count2), y: y.subarray(0, count2) });
    });
    this.schedule();
  }
  /** Listed data sets that have data, in drawing order. */
  shown() {
    const colors = this.colors();
    const out = [];
    for (const [j, s] of this.get("series").entries()) {
      const data = this.sets.get(String(s.name));
      if (!data) continue;
      const t = traceStyle(this.get("series"), j, colors);
      out.push({ name: String(s.name ?? ""), color: t.color, style: String(s.style ?? "line"), width: t.width, data });
    }
    return out;
  }
  fullRange() {
    const sets = this.shown();
    const auto = (lim, arrays) => {
      const r = dataRange(arrays);
      const out = [lim[0] ?? r[0], lim[1] ?? r[1]];
      return out[1] > out[0] ? out : r;
    };
    return {
      x: auto([this.get("x_min"), this.get("x_max")], sets.map((s) => s.data.x)),
      y: auto([this.get("y_min"), this.get("y_max")], sets.map((s) => s.data.y))
    };
  }
  cursorText(x) {
    const unit = this.get("unit");
    const vals = this.shown().map((s) => formatValue(xyValueAt(s.data.x, s.data.y, x), "%.4g"));
    return vals.length ? `→ ${vals.join(", ")}${unit ? ` ${unit}` : ""}` : "";
  }
  /** Points of a set in drawing order: sorted by x for lines, steps and bars. */
  points(style, d) {
    const pts = [];
    for (let i = 0; i < d.x.length; i++) pts.push([d.x[i], d.y[i]]);
    if (style === "step" || style === "bar") pts.sort((a, b) => a[0] - b[0]);
    return pts;
  }
  draw() {
    const colors = this.colors();
    const sets = this.shown();
    drawLegend(this.legend, sets.map((s) => ({ name: s.name, color: s.color, width: s.width, visible: true })), this.get("show_legend"));
    const n = sets.reduce((acc, s) => acc + s.data.x.length, 0);
    setAttr(this.body, "aria-label", `${this.get("label") || "XY graph"}: ${sets.length} data set${sets.length === 1 ? "" : "s"}, ${n} points${sets.length ? ` (${sets.map((s) => s.name).join(", ")})` : ""}`);
    const ctx = this.prepareCanvas();
    if (!ctx) return;
    const [w, h] = this.get("size");
    ctx.clearRect(0, 0, w, h);
    const area = this.area();
    const r = this.ranges();
    this.drawAxes(ctx, area, r, colors);
    const { X, Y } = this.mappers(area, r);
    ctx.save();
    ctx.beginPath();
    ctx.rect(area.x, area.y, area.w, area.h);
    ctx.clip();
    const y0 = Y(Math.min(Math.max(0, r.y[0]), r.y[1]));
    for (const s of sets) {
      const pts = this.points(s.style, s.data).filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
      ctx.strokeStyle = s.color;
      ctx.fillStyle = s.color;
      ctx.lineWidth = s.width;
      if (s.style === "bar") {
        const bw = Math.max(2, Math.min(24, area.w / Math.max(1, pts.length) * 0.6));
        for (const [x, y] of pts) ctx.fillRect(X(x) - bw / 2, Math.min(Y(y), y0), bw, Math.abs(Y(y) - y0));
        continue;
      }
      if (s.style !== "markers") {
        ctx.beginPath();
        pts.forEach(([x, y], i) => {
          if (i === 0) ctx.moveTo(X(x), Y(y));
          else if (s.style === "step") {
            ctx.lineTo(X(x), Y(pts[i - 1][1]));
            ctx.lineTo(X(x), Y(y));
          } else ctx.lineTo(X(x), Y(y));
        });
        ctx.stroke();
      }
      if (s.style === "markers" || s.style === "both") {
        for (const [x, y] of pts) {
          ctx.beginPath();
          ctx.arc(X(x), Y(y), 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
    ctx.restore();
    this.drawOverlays(ctx, area, r, colors);
  }
  csvRows() {
    const rows = [["set", `x${this.get("x_unit") ? ` (${this.get("x_unit")})` : ""}`, `y${this.get("unit") ? ` (${this.get("unit")})` : ""}`]];
    for (const s of this.shown()) for (let i = 0; i < s.data.x.length; i++) rows.push([s.name, s.data.x[i], s.data.y[i]]);
    return rows;
  }
  svgContent(area, r, _colors, el) {
    const { X, Y } = this.mappers(area, r);
    const out = [];
    for (const s of this.shown()) {
      const pts = this.points(s.style, s.data).filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
      if (s.style !== "markers" && s.style !== "bar") {
        const d = pts.map(([x, y], i) => i === 0 ? `M${X(x).toFixed(1)} ${Y(y).toFixed(1)}` : s.style === "step" ? `L${X(x).toFixed(1)} ${Y(pts[i - 1][1]).toFixed(1)}L${X(x).toFixed(1)} ${Y(y).toFixed(1)}` : `L${X(x).toFixed(1)} ${Y(y).toFixed(1)}`).join("");
        out.push(el("path", { d, fill: "none", stroke: s.color, "stroke-width": s.width }));
      }
      if (s.style === "bar") {
        const y0 = Y(Math.min(Math.max(0, r.y[0]), r.y[1]));
        const bw = Math.max(2, Math.min(24, area.w / Math.max(1, pts.length) * 0.6));
        for (const [x, y] of pts) out.push(el("rect", { x: (X(x) - bw / 2).toFixed(1), y: Math.min(Y(y), y0).toFixed(1), width: bw.toFixed(1), height: Math.abs(Y(y) - y0).toFixed(1), fill: s.color }));
      }
      if (s.style === "markers" || s.style === "both") {
        for (const [x, y] of pts) out.push(el("circle", { cx: X(x).toFixed(1), cy: Y(y).toFixed(1), r: 3, fill: s.color }));
      }
    }
    return out;
  }
};

// js/src/contract/digital.ts
var EMPTY_DATA = { bits: new Uint8Array(0), nSamples: 0, nLines: 0, analog: new Float32Array(0), nAnalog: 0, nTraces: 0 };
var count = (v) => Math.max(0, Math.floor(Number(v) || 0));
function decodeDigital(msg, buffers) {
  const bits = toUint8(buffers?.[0]);
  const analog = toFloat32(buffers?.[1]);
  const nLines = count(msg.n_lines);
  const nTraces = count(msg.n_traces);
  return {
    bits,
    nLines,
    nSamples: nLines ? Math.min(count(msg.n_samples), Math.floor(bits.length / nLines)) : 0,
    analog,
    nTraces,
    nAnalog: nTraces ? Math.min(count(msg.n_analog), Math.floor(analog.length / nTraces)) : 0
  };
}
function busValue(bits, nLines, lines, i) {
  let v = 0;
  for (const l of lines) v = v * 2 + (bits[i * nLines + l] ? 1 : 0);
  return v;
}
var hex = (v) => `0x${v.toString(16).toUpperCase()}`;
function busLines(bus, nLines) {
  return (Array.isArray(bus.lines) ? bus.lines : []).map(Number).filter((l) => Number.isInteger(l) && l >= 0 && l < nLines);
}
function sampleAt(x, x0, dt) {
  return dt ? Math.floor((x - x0) / dt) : 0;
}
function runs(valueAt, i0, i1) {
  const out = [];
  if (i1 <= i0) return out;
  let start = i0;
  let cur = valueAt(i0);
  for (let i = i0 + 1; i < i1; i++) {
    const v = valueAt(i);
    if (v !== cur) {
      out.push({ start, end: i, value: cur });
      start = i;
      cur = v;
    }
  }
  out.push({ start, end: i1, value: cur });
  return out;
}

// js/src/widgets/digital.ts
var TRAITS7 = ["lines", "buses", "dt", "x0", "show_lines_in_bus", "traces", "y_min", "y_max", "analog_fraction"];
var DigitalView = class extends PlotView {
  constructor(model, el) {
    super(model, el, TRAITS7);
    this.data = EMPTY_DATA;
    this.yRangeA = [-1, 1];
    this.margin.left = 70;
    this.listen("msg:custom", (msg, buffers) => {
      if (!msg || typeof msg !== "object" || msg.type !== "data") return;
      this.data = decodeDigital(msg, buffers);
      this.schedule();
    });
    this.model.send({ type: "sync_request" });
  }
  get mixed() {
    return this.kind === "mixedgraph";
  }
  get dt() {
    return this.get("dt") || 1;
  }
  get x0() {
    return this.get("x0");
  }
  /** Rows of the timing diagram: buses then (optionally) their lines, then free lines. */
  rows() {
    const names = this.get("lines");
    const { nLines } = this.data;
    const used = /* @__PURE__ */ new Set();
    const rows = [];
    for (const b of this.get("buses")) {
      const lines = busLines(b, nLines);
      rows.push({ type: "bus", name: String(b.name ?? "bus"), lines });
      for (const l of lines) {
        used.add(l);
        if (this.get("show_lines_in_bus")) rows.push({ type: "line", name: `  ${names[l] ?? `D${l}`}`, line: l });
      }
    }
    for (let l = 0; l < nLines; l++) if (!used.has(l)) rows.push({ type: "line", name: names[l] ?? `D${l}`, line: l });
    return rows;
  }
  fullRange() {
    const d = this.data;
    const n = Math.max(d.nSamples, d.nAnalog, 1);
    if (this.mixed) {
      let lo = Infinity;
      let hi = -Infinity;
      for (const v of d.analog.subarray(0, d.nAnalog * d.nTraces)) {
        if (Number.isFinite(v)) {
          if (v < lo) lo = v;
          if (v > hi) hi = v;
        }
      }
      const ymin = this.get("y_min") ?? null;
      const ymax = this.get("y_max") ?? null;
      this.yRangeA = ymin !== null && ymax !== null ? [ymin, ymax] : autoscale([0, 0], lo, hi);
    }
    return { x: [this.x0, this.x0 + n * this.dt], y: this.mixed ? this.yRangeA : [0, 1] };
  }
  sampleRange(r) {
    const i0 = Math.max(0, Math.floor((r.x[0] - this.x0) / this.dt));
    const i1 = Math.min(this.data.nSamples, Math.ceil((r.x[1] - this.x0) / this.dt) + 1);
    return [i0, i1];
  }
  cursorText(x) {
    const d = this.data;
    const i = sampleAt(x, this.x0, this.dt);
    const parts = [];
    if (i >= 0 && i < d.nSamples) {
      for (const b of this.get("buses")) parts.push(`${String(b.name ?? "bus")}=${hex(busValue(d.bits, d.nLines, busLines(b, d.nLines), i))}`);
      if (!parts.length) parts.push(Array.from(d.bits.subarray(i * d.nLines, (i + 1) * d.nLines)).join(""));
    }
    if (i >= 0 && i < d.nAnalog) for (let j = 0; j < d.nTraces; j++) parts.push(formatValue(d.analog[i * d.nTraces + j], "%.4g"));
    return parts.length ? `→ ${parts.join(" ")}` : "";
  }
  draw() {
    const colors = this.colors();
    const d = this.data;
    const traces = this.mixed ? Array.from({ length: d.nTraces }, (_, j) => traceStyle(this.get("traces"), j, colors)) : [];
    drawLegend(this.legend, traces, true);
    setAttr(this.body, "aria-label", `${this.get("label") || "Digital waveform graph"}: ${d.nLines} lines, ${d.nSamples} samples`);
    const ctx = this.prepareCanvas();
    if (!ctx) return;
    const [w, h] = this.get("size");
    ctx.clearRect(0, 0, w, h);
    const area = this.area();
    const r = this.ranges();
    const frac = this.mixed ? this.get("analog_fraction") ?? 0.55 : 0;
    const analogArea = { ...area, h: area.h * frac };
    const digitalArea = { ...area, y: area.y + analogArea.h + (this.mixed ? 6 : 0), h: area.h - analogArea.h - (this.mixed ? 6 : 0) };
    this.drawAxes(ctx, area, { x: r.x, y: [0, 1] }, colors, { yTicks: false });
    if (this.mixed) this.drawAnalog(ctx, analogArea, r, colors);
    this.drawDigital(ctx, digitalArea, r, colors);
    this.drawOverlays(ctx, area, r, colors);
  }
  drawAnalog(ctx, a, r, colors) {
    const d = this.data;
    const Y = (v) => a.y + a.h - (v - r.y[0]) / (r.y[1] - r.y[0] || 1) * a.h;
    const X = (x) => a.x + (x - r.x[0]) / (r.x[1] - r.x[0]) * a.w;
    ctx.font = "10px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colors.fg;
    ctx.strokeStyle = colors.grid;
    for (const v of niceTicks(r.y[0], r.y[1], 3)) {
      ctx.beginPath();
      ctx.moveTo(a.x, Y(v));
      ctx.lineTo(a.x + a.w, Y(v));
      ctx.stroke();
      ctx.fillText(formatValue(v, "%.3g"), a.x - 4, Y(v));
    }
    ctx.save();
    ctx.beginPath();
    ctx.rect(a.x, a.y, a.w, a.h);
    ctx.clip();
    const i0 = Math.max(0, Math.floor((r.x[0] - this.x0) / this.dt));
    const i1 = Math.min(d.nAnalog, Math.ceil((r.x[1] - this.x0) / this.dt) + 1);
    for (let j = 0; j < d.nTraces; j++) {
      const t = traceStyle(this.get("traces"), j, colors);
      if (!t.visible) continue;
      ctx.strokeStyle = t.color;
      ctx.lineWidth = t.width;
      ctx.beginPath();
      let pen = false;
      for (let i = i0; i < i1; i++) {
        const v = d.analog[i * d.nTraces + j];
        if (!Number.isFinite(v)) {
          pen = false;
          continue;
        }
        const x = X(this.x0 + i * this.dt);
        if (pen) ctx.lineTo(x, Y(v));
        else ctx.moveTo(x, Y(v));
        pen = true;
      }
      ctx.stroke();
    }
    ctx.restore();
    ctx.strokeStyle = colors.muted;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y + a.h + 3);
    ctx.lineTo(a.x + a.w, a.y + a.h + 3);
    ctx.stroke();
  }
  drawDigital(ctx, a, r, colors) {
    const rows = this.rows();
    if (!rows.length) return;
    const { bits, nLines } = this.data;
    const rh = a.h / rows.length;
    const X = (x) => a.x + (x - r.x[0]) / (r.x[1] - r.x[0]) * a.w;
    const xi = (i) => X(this.x0 + i * this.dt);
    const [i0, i1] = this.sampleRange(r);
    ctx.font = "10px system-ui, sans-serif";
    rows.forEach((row, k) => {
      const top = a.y + k * rh + 3;
      const bottom = a.y + (k + 1) * rh - 3;
      const mid = (top + bottom) / 2;
      ctx.fillStyle = colors.fg;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(row.name, a.x - 4, mid);
      ctx.save();
      ctx.beginPath();
      ctx.rect(a.x, a.y, a.w, a.h);
      ctx.clip();
      ctx.strokeStyle = colors.trace(k);
      ctx.lineWidth = 1.5;
      if (row.type === "line") {
        const segs = runs((i) => bits[i * nLines + row.line], i0, i1);
        ctx.beginPath();
        segs.forEach((s, n) => {
          const y = s.value ? top : bottom;
          if (n === 0) ctx.moveTo(xi(s.start), y);
          else ctx.lineTo(xi(s.start), y);
          ctx.lineTo(xi(s.end), y);
        });
        ctx.stroke();
      } else {
        for (const s of runs((i) => busValue(bits, nLines, row.lines, i), i0, i1)) {
          const xa = xi(s.start);
          const xb = xi(s.end);
          const e = Math.min(3, (xb - xa) / 2);
          ctx.beginPath();
          ctx.moveTo(xa, mid);
          ctx.lineTo(xa + e, top);
          ctx.lineTo(xb - e, top);
          ctx.lineTo(xb, mid);
          ctx.lineTo(xb - e, bottom);
          ctx.lineTo(xa + e, bottom);
          ctx.closePath();
          ctx.stroke();
          const text = hex(s.value);
          if (ctx.measureText(text).width + 6 < xb - xa) {
            ctx.fillStyle = colors.fg;
            ctx.textAlign = "center";
            ctx.fillText(text, (Math.max(xa, a.x) + Math.min(xb, a.x + a.w)) / 2, mid);
          }
        }
      }
      ctx.restore();
    });
  }
  csvRows() {
    const d = this.data;
    const rows = this.rows();
    const header = ["x", ...rows.map((r2) => r2.name.trim())];
    for (let j = 0; j < d.nTraces; j++) header.push(traceStyle(this.get("traces"), j, this.colors()).name);
    const out = [header];
    const r = this.ranges();
    const n = Math.max(d.nSamples, d.nAnalog);
    for (let i = 0; i < n; i++) {
      const x = this.x0 + i * this.dt;
      if (x < r.x[0] || x > r.x[1]) continue;
      const row = [x];
      for (const rr of rows) {
        if (i >= d.nSamples) row.push("");
        else if (rr.type === "bus") row.push(hex(busValue(d.bits, d.nLines, rr.lines, i)));
        else row.push(d.bits[i * d.nLines + rr.line]);
      }
      for (let j = 0; j < d.nTraces; j++) row.push(i < d.nAnalog ? d.analog[i * d.nTraces + j] : "");
      out.push(row);
    }
    return out;
  }
  svgContent(area, r, colors, el) {
    const { bits, nLines } = this.data;
    const rows = this.rows();
    const frac = this.mixed ? this.get("analog_fraction") ?? 0.55 : 0;
    const a = { ...area, y: area.y + area.h * frac, h: area.h * (1 - frac) };
    const rh = a.h / Math.max(1, rows.length);
    const X = (x) => a.x + (x - r.x[0]) / (r.x[1] - r.x[0]) * a.w;
    const [i0, i1] = this.sampleRange(r);
    const out = [];
    rows.forEach((row, k) => {
      if (row.type !== "line") return;
      const top = a.y + k * rh + 3;
      const bottom = a.y + (k + 1) * rh - 3;
      let d = "";
      runs((i) => bits[i * nLines + row.line], i0, i1).forEach((s, n) => {
        const y = s.value ? top : bottom;
        d += `${n ? "L" : "M"}${X(this.x0 + s.start * this.dt).toFixed(1)} ${y}L${X(this.x0 + s.end * this.dt).toFixed(1)} ${y}`;
      });
      out.push(el("path", { d, fill: "none", stroke: colors.trace(k), "stroke-width": 1.5 }));
    });
    return out;
  }
};

// js/src/contract/industrial.ts
function selectorValue(positions, value, defaultPosition) {
  if (typeof value === "string" && positions.includes(value)) return value;
  if (typeof defaultPosition === "string" && positions.includes(defaultPosition)) return defaultPosition;
  return positions[Math.floor(positions.length / 2)];
}
function stackStates(tiers, value) {
  return [...value, ...Array(tiers.length).fill("off")].slice(0, tiers.length);
}

// js/src/widgets/numeric.ts
var NUMERIC_TRAITS = [
  "value",
  "min",
  "max",
  "step",
  "unit",
  "scale",
  "ticks",
  "minor_ticks",
  "format",
  "lolo",
  "lo",
  "hi",
  "hihi",
  "show_limits",
  "alarm_level",
  "animate",
  "animation_ms",
  "entry",
  "coerce",
  "value_labels"
];
var ALARM_TEXT = { lolo: "LOLO", lo: "LO", hi: "HI", hihi: "HIHI" };
var NumericView = class extends BaseView {
  constructor(model, el, traits = [], { role = "slider" } = {}) {
    super(model, el, [...NUMERIC_TRAITS, ...traits]);
    this._entryShown = "";
    this._scaleGuard = this.contract ? new ScaleGuard({ min: Number(this.contract.traits.min.default), max: Number(this.contract.traits.max.default), scale: "linear" }) : null;
    this.role = role;
    this.valueRow = html("div", { cls: "awi-value-row" });
    this.valueText = html("span", { cls: "awi-value" });
    this.badge = html("span", { cls: "awi-badge" });
    this.entryEl = html("input", { cls: "awi-entry", attrs: { type: "text", inputmode: "decimal", autocomplete: "off", spellcheck: "false", "data-lm-suppress-shortcuts": "true" } });
    this.entryUnit = html("span", { cls: "awi-entry-unit" });
    this.entryMsg = html("div", { cls: "awi-entry-msg", attrs: { role: "alert" } });
    this.entryEl.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        e.preventDefault();
        this.commitEntry();
      } else if (e.key === "Escape") {
        e.preventDefault();
        this.resetEntry();
        this.entryEl.blur();
      }
    });
    this.entryEl.addEventListener("input", () => this.showEntryError(""));
    this.entryEl.addEventListener("blur", () => {
      if (this.entryEl.value !== this._entryShown) this.commitEntry();
    });
    this.valueRow.append(this.valueText, this.entryEl, this.entryUnit, this.badge);
    this.root.append(this.valueRow, this.entryMsg);
    this.body.tabIndex = 0;
    this.body.setAttribute("aria-labelledby", this.labelEl.id);
    this.body.addEventListener("keydown", (e) => this.onKey(e));
    this.body.addEventListener("wheel", (e) => this.onWheel(e), { passive: false });
    this._lastValid = null;
  }
  // -- model accessors ----------------------------------------------------
  /** Scale in use: for a widget with a schema, the last valid one (HOST-002). */
  get scaleNow() {
    const s = { min: parseNumber(this.get("min")), max: parseNumber(this.get("max")), scale: String(this.get("scale")) };
    return this._scaleGuard ? this._scaleGuard.resolve(s, this.kind) : s;
  }
  get min() {
    return this.scaleNow.min;
  }
  get max() {
    return this.scaleNow.max;
  }
  get step() {
    return parseNumber(this.get("step")) || 0;
  }
  get scaleType() {
    return this.scaleNow.scale;
  }
  /**
   * Current value. For a widget with a schema, the value as the kernel
   * stores it: clamped to [min, max] when `coerce` is set (NUM-010).
   */
  get value() {
    const v = parseNumber(this.get("value"));
    if (!this.contract) return v;
    const s = this.scaleNow;
    return coerceValue(v, s.min, s.max, !!this.get("coerce"));
  }
  /** Named values of the scale, sorted (IND-118). */
  get valueLabels() {
    return normalizeValueLabels(this.get("value_labels"));
  }
  /** Readout of a value: its label (IND-118), or the formatted number with its unit. */
  displayText(v, withUnitText = true) {
    const label = valueLabelOf(this.valueLabels, v, this.min, this.max);
    if (label !== null) return label;
    const text = formatValue(v, this.get("format"));
    return withUnitText ? withUnit(text, this.get("unit")) : text;
  }
  /** Position of the current value; for invalid values the pointer stays put (NUM-007). */
  pos() {
    const p = position(this.value, this.min, this.max, this.scaleType);
    if (p.invalid || p.fraction === null) return { ...p, fraction: this._lastValid ?? 0 };
    this._lastValid = p.fraction;
    return { ...p, fraction: p.fraction };
  }
  frac(v) {
    return Math.min(1, Math.max(0, toFraction(v, this.min, this.max, this.scaleType)));
  }
  /** Alarm zones [{from, to, level}] as fractions of the scale (ALARM-005). */
  limitZones() {
    const g = (k) => {
      const v = this.get(k);
      return v === null || v === void 0 ? null : parseNumber(v);
    };
    const [lolo, lo, hi, hihi] = [g("lolo"), g("lo"), g("hi"), g("hihi")];
    const zones = [];
    if (lolo !== null) zones.push({ from: 0, to: this.frac(lolo), level: "lolo" });
    if (lo !== null) zones.push({ from: lolo !== null ? this.frac(lolo) : 0, to: this.frac(lo), level: "lo" });
    if (hi !== null) zones.push({ from: this.frac(hi), to: hihi !== null ? this.frac(hihi) : 1, level: "hi" });
    if (hihi !== null) zones.push({ from: this.frac(hihi), to: 1, level: "hihi" });
    return zones.filter((z) => z.to > z.from);
  }
  /** ", setpoint <value>" where the widget has a setpoint (IND-116). */
  setpointText() {
    const sp = this.get("setpoint");
    return typeof sp === "number" && Number.isFinite(sp) ? `, setpoint ${withUnit(formatValue(sp, this.get("format")), this.get("unit"))}` : "";
  }
  // -- rendering ----------------------------------------------------------
  renderCommon() {
    super.renderCommon();
    const v = this.value;
    const p = this.pos();
    const level = String(this.get("alarm_level") || "normal");
    const r = this.root;
    for (const l of ["lolo", "lo", "hi", "hihi"]) r.classList.toggle(`awi-alarm-${l}`, level === l);
    r.classList.toggle("awi-invalid", p.invalid);
    r.classList.toggle("awi-animate", !!this.get("animate"));
    r.style.setProperty("--awi-anim", `${Math.min(300, Number(this.get("animation_ms")) || 0)}ms`);
    const text = this.displayText(v);
    setText(this.valueText, text);
    this.renderEntry(v);
    const parts = [];
    if (p.over) parts.push("▲ OVER");
    if (p.under) parts.push("▼ UNDER");
    if (ALARM_TEXT[level]) parts.push(ALARM_TEXT[level]);
    setText(this.badge, parts.join(" "));
    setHidden(this.badge, parts.length === 0);
    const b = this.body;
    setAttrs(b, {
      role: this.get("mode") === "control" ? this.role : "meter",
      "aria-valuemin": String(this.min),
      "aria-valuemax": String(this.max),
      "aria-valuenow": Number.isFinite(v) ? String(v) : null,
      "aria-valuetext": `${text}${parts.length ? ` (${parts.join(", ")})` : ""}${this.setpointText()}`,
      "aria-label": this.get("label") ? null : this.kind,
      tabindex: this.get("mode") === "control" ? "0" : "-1"
    });
  }
  /** Show the entry field in control mode (NUM-010), without disturbing typing. */
  renderEntry(v) {
    const on = this.get("mode") === "control" && this.get("entry") !== false;
    const unit = this.get("unit") || "";
    const format = this.get("format");
    this.root.classList.toggle("awi-has-entry", on);
    setHidden(this.entryEl, !on);
    setHidden(this.entryUnit, !on || !unit);
    setAttr(this.valueText, "aria-hidden", on ? "true" : "false");
    if (!on) {
      this.showEntryError("");
      return;
    }
    if (this.entryEl.disabled !== !this.interactive) this.entryEl.disabled = !this.interactive;
    setText(this.entryUnit, unit);
    const label = this.get("label") || this.kind;
    const named = this.valueLabels;
    const choices = named.length ? named.map((l) => l.label).join(", ") : `${formatValue(this.min, format)} to ${formatValue(this.max, format)}`;
    setAttr(this.entryEl, "aria-label", `${label} value (${choices})`);
    if (document.activeElement !== this.entryEl) this.resetEntry(v);
  }
  resetEntry(v = this.value) {
    this._entryShown = Number.isFinite(v) ? this.displayText(v, false) : "";
    this.entryEl.value = this._entryShown;
    setAttr(this.entryEl, "placeholder", Number.isFinite(v) ? null : formatValue(v));
    this.showEntryError("");
  }
  showEntryError(reason) {
    setText(this.entryMsg, reason);
    setHidden(this.entryMsg, !reason);
    setAttr(this.entryEl, "aria-invalid", reason ? "true" : null);
  }
  /** Validate and send the typed value (NUM-010); rejected entries stay for correction. */
  commitEntry() {
    if (!this.interactive) return this.resetEntry();
    const named = valueOfLabel(this.valueLabels, this.entryEl.value);
    if (named !== null) {
      this.showEntryError("");
      this.commit(named, true);
      return this.resetEntry(named);
    }
    const r = checkEntry(this.entryEl.value, { min: this.min, max: this.max, step: this.step, unit: this.get("unit") || "", coerce: !!this.get("coerce"), format: this.get("format") });
    if (!r.ok) return this.showEntryError(r.reason);
    this.showEntryError("");
    this.commit(r.value, true);
    this.resetEntry(r.value);
  }
  /**
   * Skin part (STYLE-005) fitted into the box (x, y, w, h), or null when no
   * skin is supplied for `name`. Parts: background, housing, knob, needle.
   */
  skinPart(name, w, h, x = 0, y = 0, align = "xMidYMid meet") {
    const skin = this.get("skin") || {};
    const node = parseSkin(skin[name]);
    if (!node) return null;
    node.setAttribute("x", String(x));
    node.setAttribute("y", String(y));
    node.setAttribute("width", String(w));
    node.setAttribute("height", String(h));
    node.setAttribute("preserveAspectRatio", align);
    return svg("g", { class: `awi-skin awi-skin-${name}` }, [node]);
  }
  // -- interaction ------------------------------------------------------------
  /** Commit a new value (snapped to step and clamped, NUM-005). */
  commit(v, final = false) {
    if (!this.interactive || !Number.isFinite(v)) return;
    const next = snap(v, this.min, this.max, this.step);
    this.model.set("value", next);
    this.schedule();
    this.sendValue(next, final);
  }
  commitFraction(f, final = false) {
    this.commit(fromFraction(f, this.min, this.max, this.scaleType), final);
  }
  nudge(k) {
    const base = Number.isFinite(this.value) ? this.value : this.min;
    if (this.scaleType === "log") {
      const f = this.frac(base) + k * 0.01;
      this.commitFraction(Math.min(1, Math.max(0, f)), true);
    } else {
      this.commit(base + k * keyStep(this.min, this.max, this.step), true);
    }
  }
  onKey(e) {
    if (!this.interactive) return;
    const map = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10 };
    if (e.key in map) this.nudge(map[e.key]);
    else if (e.key === "Home") this.commit(this.min, true);
    else if (e.key === "End") this.commit(this.max, true);
    else return;
    e.preventDefault();
  }
  onWheel(e) {
    if (!this.interactive || document.activeElement !== this.body) return;
    e.preventDefault();
    this.nudge(e.deltaY < 0 ? 1 : -1);
  }
  /** Pointer capture helper: calls move(e) during the drag and end(e) on release. */
  drag(target, { start, move, end }) {
    target.addEventListener("pointerdown", (ev) => {
      const e = ev;
      if (!this.interactive || e.button !== 0) return;
      e.preventDefault();
      this.body.focus({ preventScroll: true });
      target.setPointerCapture?.(e.pointerId);
      this.root.classList.add("awi-dragging");
      start?.(e);
      const onMove = (m) => move?.(m);
      const onUp = (u) => {
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onUp);
        target.removeEventListener("pointercancel", onUp);
        this.root.classList.remove("awi-dragging");
        end?.(u);
      };
      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onUp);
      target.addEventListener("pointercancel", onUp);
    });
  }
};
function svgPoint(svgEl, e) {
  const ctm = svgEl.getScreenCTM?.();
  if (!ctm) return { x: 0, y: 0 };
  const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
  return { x: pt.x, y: pt.y };
}

// js/src/widgets/industrial.ts
var AnalogIndicatorView = class extends NumericView {
  constructor(model, el) {
    super(model, el, ["orientation", "normal_lo", "normal_hi", "target"], { role: "slider" });
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    const hit = (e, final) => {
      if (!this.track) return;
      const p = svgPoint(this.svgEl, e);
      this.commitFraction(linearHit(this.vertical ? p.y : p.x, this.track.a0, this.track.a1), final);
    };
    this.drag(this.svgEl, { start: (e) => hit(e, false), move: (e) => hit(e, false), end: (e) => hit(e, true) });
    this.schedule();
  }
  get vertical() {
    return this.get("orientation") === "vertical";
  }
  opt(name) {
    const v = this.get(name);
    return v === null || v === void 0 ? null : parseNumber(v);
  }
  draw() {
    const [w, h] = this.get("size");
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    clear(s);
    const v = this.vertical;
    const t = v ? { a0: h - 10, a1: 10, b0: w - 30, b1: w - 18 } : { a0: 12, a1: w - 12, b0: 14, b1: 26 };
    this.track = t;
    const at = (f) => t.a0 + f * (t.a1 - t.a0);
    const rect = (f0, f1, b0, b1, cls) => {
      const [p2, q] = [at(f0), at(f1)].sort((x, y) => x - y);
      return svg("rect", v ? { class: cls, x: b0, y: p2, width: b1 - b0, height: q - p2 } : { class: cls, x: p2, y: b0, width: q - p2, height: b1 - b0 });
    };
    s.appendChild(rect(0, 1, t.b0, t.b1, "awi-ai-track"));
    const lo = this.opt("normal_lo");
    const hi = this.opt("normal_hi");
    if (lo !== null || hi !== null) s.appendChild(rect(lo === null ? 0 : this.frac(lo), hi === null ? 1 : this.frac(hi), t.b0, t.b1, "awi-ai-normal"));
    if (this.get("show_limits")) {
      for (const k of ["lolo", "lo", "hi", "hihi"]) {
        const val = this.opt(k);
        if (val === null) continue;
        const p2 = at(this.frac(val));
        const d2 = v ? `M${t.b0 - 4} ${p2}H${t.b1 + 4}` : `M${p2} ${t.b0 - 4}V${t.b1 + 4}`;
        s.appendChild(svg("path", { class: `awi-ai-limit awi-ai-limit-${k}`, d: d2 }));
      }
    }
    const target = this.opt("target");
    if (target !== null) {
      const p2 = at(this.frac(target));
      const c = v ? [t.b1 + 7, p2] : [p2, t.b1 + 7];
      s.appendChild(svg("path", { class: "awi-ai-target", d: `M${c[0]} ${c[1] - 5}L${c[0] + 5} ${c[1]}L${c[0]} ${c[1] + 5}L${c[0] - 5} ${c[1]}Z` }));
    }
    const tk = ticks(this.min, this.max, this.get("ticks"), 0, this.scaleType);
    const fmt = tickFormat(this.get("format"));
    for (const val of tk.major) {
      const p2 = at(this.frac(val));
      const attrs = v ? { x: t.b0 - 6, y: p2, "text-anchor": "end", "dominant-baseline": "central" } : { x: p2, y: t.b1 + 22, "text-anchor": "middle" };
      s.appendChild(svgText(formatValue(val, fmt), { class: "awi-tick-label", ...attrs }));
      s.appendChild(svg("path", { class: "awi-tick-minor", d: v ? `M${t.b0 - 3} ${p2}H${t.b0}` : `M${p2} ${t.b1}V${t.b1 + 3}` }));
    }
    const pos = this.pos();
    const p = at(pos.fraction);
    const d = v ? `M${t.b1 + 1} ${p}L${t.b1 + 12} ${p - 7}L${t.b1 + 12} ${p + 7}Z` : `M${p} ${t.b0 - 1}L${p - 7} ${t.b0 - 12}L${p + 7} ${t.b0 - 12}Z`;
    s.appendChild(svg("path", { class: "awi-ai-pointer", d }));
    s.appendChild(v ? svg("path", { class: "awi-ai-pointer-line", d: `M${t.b0} ${p}H${t.b1}` }) : svg("path", { class: "awi-ai-pointer-line", d: `M${p} ${t.b0}V${t.b1}` }));
  }
};
var SPREAD = { 2: 90, 3: 120, 4: 150, 5: 180 };
function selectorAngle(i, n) {
  const spread = SPREAD[n] ?? 120;
  return n <= 1 ? 0 : -spread / 2 + i * spread / (n - 1);
}
var SelectorView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "positions", "keyed", "locked", "spring_return", "default_position"]);
    this.svgEl = svg("svg", { class: "awi-svg", viewBox: "0 0 100 100", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.stateEl = html("div", { cls: "awi-value-row" }, [html("span", { cls: "awi-value" })]);
    this.choice = html("select", { cls: "awi-choice", attrs: { "data-lm-suppress-shortcuts": "true" } });
    this.choice.addEventListener("change", () => this.select(this.choice.value));
    this.choice.addEventListener("keydown", (e) => e.stopPropagation());
    this.stateEl.appendChild(this.choice);
    this.root.appendChild(this.stateEl);
    this.body.setAttribute("aria-labelledby", this.labelEl.id);
    this.body.addEventListener("keydown", (e) => this.onKey(e));
    this.body.addEventListener("keyup", () => this.release());
    this.body.addEventListener("pointerup", () => this.release());
    this.body.addEventListener("pointercancel", () => this.release());
    this.schedule();
  }
  get positions() {
    return this.get("positions") || [];
  }
  /** Selected position, resolved as the kernel does (x-awi-resolved). */
  get value() {
    return selectorValue(this.positions, this.get("value"), this.get("default_position"));
  }
  get canOperate() {
    return this.interactive && !(this.get("keyed") && this.get("locked"));
  }
  select(label) {
    if (!this.canOperate || label === this.value) return;
    this.model.set("value", label);
    this.model.save_changes();
    this.schedule();
  }
  /** IND-013: spring-return positions go back to the default when released. */
  release() {
    const v = this.value;
    const def = this.get("default_position");
    if (def && (this.get("spring_return") || []).includes(v)) this.select(def);
  }
  onKey(e) {
    if (e.repeat && e.key.startsWith("Arrow")) return e.preventDefault();
    const pos = this.positions;
    const i = pos.indexOf(this.value);
    const map = { ArrowRight: i + 1, ArrowUp: i + 1, ArrowLeft: i - 1, ArrowDown: i - 1, Home: 0, End: pos.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const j = Math.min(pos.length - 1, Math.max(0, map[e.key]));
    this.select(pos[j]);
  }
  draw() {
    const s = this.svgEl;
    clear(s);
    const pos = this.positions;
    const value = this.value;
    const idx = Math.max(0, pos.indexOf(value));
    const locked = !!(this.get("keyed") && this.get("locked"));
    this.root.classList.toggle("awi-locked", locked);
    s.appendChild(svg("circle", { class: "awi-sel-plate", cx: 50, cy: 58, r: 28 }));
    pos.forEach((label, i) => {
      const a = selectorAngle(i, pos.length) * Math.PI / 180;
      const [x, y] = [50 + 43 * Math.sin(a), 58 - 42 * Math.cos(a)];
      const [mx, my] = [50 + 29 * Math.sin(a), 58 - 29 * Math.cos(a)];
      s.appendChild(svg("path", { class: "awi-tick-major", d: `M${mx} ${my}L${50 + 33 * Math.sin(a)} ${58 - 33 * Math.cos(a)}` }));
      const text2 = svgText(label, { class: `awi-sel-label${i === idx ? " awi-sel-current" : ""}`, x, y, "text-anchor": "middle", "dominant-baseline": "central" });
      const hit = svg("circle", { class: "awi-sel-hit", cx: x, cy: y, r: 11 });
      hit.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        this.body.focus({ preventScroll: true });
        this.select(label);
      });
      s.append(text2, hit);
    });
    const angle = selectorAngle(idx, pos.length);
    const handle = svg("g", { class: "awi-sel-handle", transform: `rotate(${angle} 50 58)` }, [
      svg("circle", { class: "awi-knob-body", cx: 50, cy: 58, r: 19 }),
      svg("rect", { class: "awi-sel-bar", x: 44.5, y: 36, width: 11, height: 44, rx: 5 }),
      svg("path", { class: "awi-sel-arrow", d: "M50 38L46 45H54Z" })
    ]);
    s.appendChild(handle);
    if (this.get("keyed")) {
      s.appendChild(svg("rect", { class: "awi-sel-key", x: 47.5, y: 52, width: 5, height: 12, rx: 1 }));
      if (locked) {
        s.appendChild(svg("g", { class: "awi-sel-lock" }, [
          svg("path", { class: "awi-lock-shackle", d: "M6 88V83A5 5 0 0 1 16 83V88" }),
          svg("rect", { class: "awi-lock-body", x: 3, y: 88, width: 16, height: 11, rx: 2 })
        ]));
      }
    }
    const text = `${value}${locked ? " · LOCKED" : ""}`;
    const valueEl = this.stateEl.firstChild;
    valueEl.textContent = text;
    const list = this.get("mode") === "control";
    this.choice.hidden = !list;
    if (list) valueEl.textContent = locked ? "LOCKED" : "";
    valueEl.hidden = list && !locked;
    if (list) {
      const labels = [...this.choice.options].map((o) => o.value);
      if (labels.join("\0") !== pos.join("\0")) {
        clear(this.choice);
        for (const p of pos) this.choice.appendChild(html("option", { text: p, attrs: { value: p } }));
      }
      this.choice.value = value;
      this.choice.disabled = !this.canOperate;
      this.choice.setAttribute("aria-label", `${this.get("label") || "Selector"} position${locked ? " (locked)" : ""}`);
    }
    const b = this.body;
    b.tabIndex = this.get("mode") === "control" ? 0 : -1;
    b.setAttribute("role", this.get("mode") === "control" ? "slider" : "img");
    b.setAttribute("aria-valuemin", "0");
    b.setAttribute("aria-valuemax", String(pos.length - 1));
    b.setAttribute("aria-valuenow", String(idx));
    b.setAttribute("aria-valuetext", text);
    if (locked) b.setAttribute("aria-readonly", "true");
    else b.removeAttribute("aria-readonly");
  }
};
var STATE_GLYPH = { off: "○", on: "●", blink: "◐" };
var StackLightView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "tiers", "labels", "buzzer"]);
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.body.setAttribute("role", "status");
    this.schedule();
  }
  draw() {
    const [w, h] = this.get("size");
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    clear(s);
    const tiers = this.get("tiers") || [];
    const states = stackStates(tiers, this.get("value") || []);
    const labels = this.get("labels") || [];
    const buzzer = !!this.get("buzzer");
    const col = { x: 8, w: Math.min(40, w * 0.35) };
    const top = buzzer ? 26 : 8;
    const pole = 26;
    const tierH = Math.max(12, (h - top - pole - 4) / Math.max(1, tiers.length));
    const parts = [];
    if (buzzer) {
      s.appendChild(svg("rect", { class: "awi-stack-buzzer", x: col.x + 4, y: 6, width: col.w - 8, height: 16, rx: 3 }));
      s.appendChild(svg("path", { class: "awi-stack-waves", d: `M${col.x + col.w + 3} 9q4 5 0 10M${col.x + col.w + 8} 6q6 8 0 16` }));
      s.appendChild(svgText("♪ BUZZER", { class: "awi-stack-text", x: col.x + col.w + 16, y: 14, "dominant-baseline": "central" }));
      parts.push("buzzer sounding");
    }
    tiers.forEach((color, i) => {
      const state = states[i] || "off";
      const y = top + i * tierH;
      s.appendChild(svg("rect", { class: `awi-stack-tier awi-stack-${color} awi-stack-${state}`, x: col.x, y: y + 1, width: col.w, height: tierH - 2, rx: 3 }));
      const label = labels[i] || color;
      const text = `${STATE_GLYPH[state] || ""} ${label}: ${state.toUpperCase()}`;
      s.appendChild(svgText(text, { class: `awi-stack-text awi-stack-text-${state}`, x: col.x + col.w + 6, y: y + tierH / 2, "dominant-baseline": "central" }));
      parts.push(`${label} ${state}`);
    });
    const baseY = top + tiers.length * tierH;
    s.appendChild(svg("rect", { class: "awi-stack-pole", x: col.x + col.w / 2 - 3, y: baseY, width: 6, height: pole - 8 }));
    s.appendChild(svg("rect", { class: "awi-stack-pole", x: col.x, y: baseY + pole - 8, width: col.w, height: 6, rx: 2 }));
    this.body.setAttribute("aria-label", `${this.get("label") || "Stack light"}: ${parts.join(", ")}`);
  }
};

// js/src/contract/intensity.ts
function roundHalfEven(v) {
  const r = Math.round(v);
  return Math.abs(v % 1) === 0.5 && r % 2 !== 0 ? r - 1 : r;
}
var RowRing = class {
  constructor(history, bins) {
    /** Rows appended since the last clear. */
    this.total = 0;
    this.history = history;
    this.bins = bins;
    this.data = new Float32Array(history * bins).fill(NaN);
  }
  /**
   * Store the last `n` rows of an append (or snapshot) whose running count
   * is `total`: row r is absolute row total - n + r. Rows missing from a
   * short buffer are stored as NaN (never read past the buffer).
   */
  store(rows, n, total) {
    const count2 = Math.min(n, Math.floor(rows.length / this.bins));
    const start = total - n;
    for (let r = Math.max(0, n - this.history); r < n; r++) {
      const slot = (start + r) % this.history * this.bins;
      if (r < count2) this.data.set(rows.subarray(r * this.bins, (r + 1) * this.bins), slot);
      else this.data.fill(NaN, slot, slot + this.bins);
    }
    this.total = total;
  }
  /** True when absolute row `i` is still kept. */
  has(i) {
    return i >= 0 && i < this.total && i >= this.total - this.history;
  }
  /** Values of absolute row `i`, or null when it is not kept. */
  row(i) {
    if (!this.has(i)) return null;
    const slot = i % this.history * this.bins;
    return this.data.subarray(slot, slot + this.bins);
  }
};
function rowIndexAt(x, dt) {
  return dt ? roundHalfEven(x / dt) : 0;
}

// js/src/widgets/intensity.ts
var STOPS = {
  viridis: ["#440154", "#482878", "#3e4989", "#31688e", "#26828e", "#1f9e89", "#35b779", "#6ece58", "#b5de2b", "#fde725"],
  inferno: ["#000004", "#1b0c41", "#4a0c6b", "#781c6d", "#a52c60", "#cf4446", "#ed6925", "#fb9b06", "#f7d13d", "#fcffa4"],
  magma: ["#000004", "#180f3d", "#440f76", "#721f81", "#9e2f7f", "#cd4071", "#f1605d", "#fd9668", "#feca8d", "#fcfdbf"],
  plasma: ["#0d0887", "#46039f", "#7201a8", "#9c179e", "#bd3786", "#d8576b", "#ed7953", "#fb9f3a", "#fdca26", "#f0f921"],
  gray: ["#000000", "#ffffff"],
  jet: ["#00007f", "#0000ff", "#007fff", "#00ffff", "#7fff7f", "#ffff00", "#ff7f00", "#ff0000", "#7f0000"]
};
var lutCache = {};
function colormapLut(name) {
  if (lutCache[name]) return lutCache[name];
  const stops = (STOPS[name] || STOPS.viridis).map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)));
  const lut = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const f = i / 255 * (stops.length - 1);
    const k = Math.min(stops.length - 2, Math.floor(f));
    const u = f - k;
    for (let c = 0; c < 3; c++) lut[i * 3 + c] = Math.round(stops[k][c] * (1 - u) + stops[k + 1][c] * u);
  }
  lutCache[name] = lut;
  return lut;
}
var TRAITS8 = ["history", "n_bins", "dt", "y_min", "y_max", "z_min", "z_max", "autoscale_z", "colormap", "show_colorbar"];
var IntensityView = class extends PlotView {
  constructor(model, el) {
    super(model, el, TRAITS8);
    this.dirtyAll = true;
    this.zRange = [this.get("z_min"), this.get("z_max")];
    this.image = document.createElement("canvas");
    this.reset();
    this.listen("msg:custom", (msg, buffers) => this.onMessage(msg, buffers));
    this.listen("change:history", () => this.reset());
    this.listen("change:n_bins", () => this.reset());
    this.model.send({ type: "sync_request" });
  }
  get history() {
    return this.ring.history;
  }
  get bins() {
    return this.ring.bins;
  }
  get total() {
    return this.ring.total;
  }
  reset() {
    this.ring = new RowRing(this.get("history"), this.get("n_bins"));
    this.image.width = this.ring.history;
    this.image.height = this.ring.bins;
    this.dirtyAll = true;
    this.schedule();
  }
  /** append / snapshot / clear messages (see intensitychart.schema.json). */
  onMessage(msg, buffers) {
    if (!msg || typeof msg !== "object") return;
    const m = msg;
    if (m.type === "clear") return this.reset();
    if (m.type !== "append" && m.type !== "snapshot") return;
    if (m.type === "snapshot") this.reset();
    const n = Math.max(0, Math.floor(Number(m.n_rows) || 0));
    const total = Math.max(n, Math.floor(Number(m.total) || 0));
    this.ring.store(toFloat32(buffers?.[0]), n, total);
    this.dirtyAll = true;
    this.schedule();
  }
  /** Rebuild the chronological image (oldest column on the left). */
  rebuild() {
    let ctx = null;
    try {
      ctx = this.image.getContext?.("2d") ?? null;
    } catch {
      ctx = null;
    }
    if (!ctx) return;
    const { history, bins } = this;
    const data = this.ring.data;
    const n = Math.min(this.total, history);
    const first = this.total - n;
    if (this.get("autoscale_z")) {
      let lo = Infinity;
      let hi = -Infinity;
      for (let i = 0; i < data.length; i++) {
        const v = data[i];
        if (Number.isFinite(v)) {
          if (v < lo) lo = v;
          if (v > hi) hi = v;
        }
      }
      this.zRange = autoscale(this.zRange, lo, hi, { pad: 0 });
    } else {
      this.zRange = [this.get("z_min"), this.get("z_max")];
    }
    const [z0, z1] = this.zRange;
    const lut = colormapLut(this.get("colormap"));
    const img = ctx.createImageData(history, bins);
    const px = img.data;
    const offset = history - n;
    for (let c = 0; c < n; c++) {
      const slot = (first + c) % history * bins;
      for (let b = 0; b < bins; b++) {
        const v = data[slot + b];
        const o = ((bins - 1 - b) * history + offset + c) * 4;
        if (!Number.isFinite(v)) continue;
        const k = Math.max(0, Math.min(255, Math.round((v - z0) / (z1 - z0 || 1) * 255)));
        px[o] = lut[k * 3];
        px[o + 1] = lut[k * 3 + 1];
        px[o + 2] = lut[k * 3 + 2];
        px[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    this.dirtyAll = false;
  }
  get dt() {
    return this.get("dt") || 1;
  }
  get yRange() {
    const y0 = this.get("y_min");
    const ymax = this.get("y_max");
    return [y0, ymax === null ? y0 + this.bins : ymax];
  }
  fullRange() {
    const t0 = this.total - this.history;
    return { x: [t0 * this.dt, this.total * this.dt], y: this.yRange };
  }
  area() {
    const a = super.area();
    if (this.get("show_colorbar")) a.w = Math.max(10, a.w - 46);
    return a;
  }
  cursorText(x) {
    const row = this.ring.row(rowIndexAt(x, this.dt));
    if (!row) return "";
    let best = -Infinity;
    let arg = -1;
    row.forEach((v, b) => {
      if (v > best) {
        best = v;
        arg = b;
      }
    });
    const [y0, y1] = this.yRange;
    return arg < 0 ? "" : `peak ${formatValue(best, "%.3g")} @ ${formatValue(y0 + (arg + 0.5) * (y1 - y0) / this.bins, "%.4g")}`;
  }
  draw() {
    const ctx = this.prepareCanvas();
    if (ctx && (this.dirtyAll || this._lastMap !== this.get("colormap") || !this.get("autoscale_z"))) {
      this._lastMap = this.get("colormap");
      this.rebuild();
    }
    setAttr(this.body, "aria-label", `${this.get("label") || "Intensity chart"}: ${this.total} rows, color range ${formatValue(this.zRange[0], "%.3g")} to ${formatValue(this.zRange[1], "%.3g")} ${this.get("unit") || ""}`.trim());
    if (!ctx) return;
    const colors = this.colors();
    const [w, h] = this.get("size");
    ctx.clearRect(0, 0, w, h);
    const area = this.area();
    const r = this.ranges();
    const full = this.fullRange();
    this.drawAxes(ctx, area, r, colors);
    const fx = (x) => (x - full.x[0]) / (full.x[1] - full.x[0]) * this.history;
    const fy = (y) => (1 - (y - full.y[0]) / (full.y[1] - full.y[0])) * this.bins;
    const sx = fx(r.x[0]);
    const sw = fx(r.x[1]) - sx;
    const sy = fy(r.y[1]);
    const sh = fy(r.y[0]) - sy;
    ctx.imageSmoothingEnabled = false;
    if (sw > 0 && sh > 0) ctx.drawImage(this.image, sx, sy, sw, sh, area.x, area.y, area.w, area.h);
    this.drawOverlays(ctx, area, r, colors);
    if (this.get("show_colorbar")) this.drawColorbar(ctx, area, colors);
  }
  drawColorbar(ctx, area, colors) {
    const lut = colormapLut(this.get("colormap"));
    const x = area.x + area.w + 8;
    for (let i = 0; i < area.h; i++) {
      const k = Math.round((1 - i / area.h) * 255);
      ctx.fillStyle = `rgb(${lut[k * 3]},${lut[k * 3 + 1]},${lut[k * 3 + 2]})`;
      ctx.fillRect(x, area.y + i, 10, 1);
    }
    ctx.strokeStyle = colors.fg;
    ctx.strokeRect(x + 0.5, area.y + 0.5, 10, area.h - 1);
    ctx.fillStyle = colors.fg;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const [z0, z1] = this.zRange;
    for (const v of niceTicks(z0, z1, 4)) {
      ctx.fillText(formatValue(v, "%.3g"), x + 13, area.y + area.h - (v - z0) / (z1 - z0 || 1) * area.h);
    }
  }
  csvRows() {
    const [y0, y1] = this.yRange;
    const header = ["x", ...Array.from({ length: this.bins }, (_, b) => formatValue(y0 + (b + 0.5) * (y1 - y0) / this.bins, "%.6g"))];
    const rows = [header];
    const n = Math.min(this.total, this.history);
    for (let c = 0; c < n; c++) {
      const i = this.total - n + c;
      rows.push([i * this.dt, ...this.ring.row(i) ?? []]);
    }
    return rows;
  }
  svgContent(area, _r, _colors, el) {
    const c = document.createElement("canvas");
    c.width = Math.round(area.w);
    c.height = Math.round(area.h);
    const ctx = c.getContext?.("2d");
    if (!ctx) return [];
    const [w, h] = this.get("size");
    const kx = this.canvas.width / w;
    const ky = this.canvas.height / h;
    ctx.drawImage(this.canvas, area.x * kx, area.y * ky, area.w * kx, area.h * ky, 0, 0, c.width, c.height);
    return [el("image", { x: area.x, y: area.y, width: area.w, height: area.h, href: c.toDataURL("image/png") })];
  }
};

// js/src/widgets/banner.ts
var RANK3 = { critical: 0, high: 1, medium: 2, low: 3 };
var PRIORITY_TEXT3 = { critical: "P1", high: "P2", medium: "P3", low: "P4" };
var STATE_TEXT4 = { active_unacknowledged: "ACTIVE · UNACK", active_acknowledged: "ACTIVE · ACK", cleared_unacknowledged: "CLEARED · UNACK" };
function sortAlarms(alarms) {
  const unack = (a) => a.state === "active_acknowledged" ? 1 : 0;
  return [...alarms].sort((a, b) => unack(a) - unack(b) || (RANK3[String(a.priority)] ?? 9) - (RANK3[String(b.priority)] ?? 9) || String(b.timestamp).localeCompare(String(a.timestamp)));
}
var BannerView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value"]);
    this.header = html("div", { cls: "awi-banner-head" });
    this.count = html("span", { cls: "awi-banner-count" });
    this.ackAll = html("button", { cls: "awi-ack", text: "ACK ALL", attrs: { type: "button" } });
    this.ackAll.addEventListener("click", () => this.send({ type: "ack_all" }));
    this.header.append(this.count, this.ackAll);
    this.table = html("table", { cls: "awi-banner-table" });
    const head = html("tr", {}, ["Time", "Prio", "Source", "Message", "State", ""].map((t) => html("th", { text: t, attrs: { scope: "col" } })));
    this.table.appendChild(html("thead", {}, [head]));
    this.tbody = html("tbody");
    this.table.appendChild(this.tbody);
    this.scroller = html("div", { cls: "awi-banner-scroll" }, [this.table]);
    this.body.append(this.header, this.scroller);
    this.body.setAttribute("role", "region");
    this.schedule();
  }
  /** Operator action: always sent to the host; applied by the front end when no host owns the state (HOST-004). */
  send(msg) {
    if (!this.interactive) return;
    this.model.send(msg);
    alarmAction(this.model, msg);
  }
  draw() {
    const alarms = sortAlarms(this.get("value") || []);
    const unacked = alarms.filter((a) => a.state !== "active_acknowledged").length;
    this.count.textContent = `${alarms.length} alarm${alarms.length === 1 ? "" : "s"} · ${unacked} unacknowledged`;
    this.ackAll.hidden = !(unacked && this.get("mode") === "control");
    this.body.setAttribute("aria-label", `${this.get("label") || "Alarm banner"}: ${this.count.textContent}`);
    clear(this.tbody);
    for (const a of alarms) {
      const time = String(a.timestamp || "").replace("T", " ");
      const ack = html("button", { cls: "awi-ack", text: "ACK", attrs: { type: "button", "aria-label": `Acknowledge ${a.id}` } });
      ack.hidden = !(a.state !== "active_acknowledged" && this.get("mode") === "control");
      ack.addEventListener("click", () => this.send({ type: "ack", alarm_id: a.id }));
      const prio = html("td", {}, [html("span", { cls: "awi-prio-chip", text: PRIORITY_TEXT3[String(a.priority)] || String(a.priority) })]);
      const row = html("tr", { cls: `awi-prio-${a.priority} awi-state-${a.state}` }, [
        html("td", { text: time }),
        prio,
        html("td", { text: String(a.source || "") }),
        html("td", { text: `${a.id}${a.message ? `: ${a.message}` : ""}` }),
        html("td", { text: STATE_TEXT4[a.state] || a.state }),
        html("td", {}, [ack])
      ]);
      this.tbody.appendChild(row);
    }
    if (!alarms.length) this.tbody.appendChild(html("tr", {}, [html("td", { text: "No active alarm", attrs: { colspan: "6" } })]));
  }
};

// js/src/widgets/pid.ts
var ALARM_TEXT2 = { lolo: "LOLO", lo: "LO", hi: "HI", hihi: "HIHI" };
var EDITABLE_IN2 = { sp: "AUTO", op: "MAN" };
function entryDecision({ field, mode, value, current, min, max, confirmDelta }) {
  const s = { pv: NaN, sp: current, op: current, loop_mode: mode, modes: [mode], pv_min: min, pv_max: max, sp_min: null, sp_max: null, op_min: min, op_max: max, confirm_delta: confirmDelta ?? null, sp_tracking: false };
  const r = operatorSet(s, field, value, true);
  if (!r.ok) return r;
  return { ok: true, value: r.value, confirm: confirmDelta !== null && confirmDelta !== void 0 && Math.abs(r.value - current) > confirmDelta };
}
var PIDView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "tag", "unit", "op_unit", "format", "pv", "sp", "op", "loop_mode", "modes", "pv_min", "pv_max", "sp_min", "sp_max", "op_min", "op_max", "confirm_delta", "lolo", "lo", "hi", "hihi", "alarm_level"]);
    const b = this.body;
    b.setAttribute("role", "group");
    this.head = html("div", { cls: "awi-pid-head" });
    this.tagEl = html("span", { cls: "awi-pid-tag" });
    this.modeBar = html("div", { cls: "awi-pid-modes", attrs: { role: "group", "aria-label": "Loop mode" } });
    this.head.append(this.tagEl, this.modeBar);
    this.svgEl = svg("svg", { class: "awi-svg awi-pid-bars", "aria-hidden": "true" });
    this.rows = {};
    const table = html("div", { cls: "awi-pid-rows" });
    for (const f of ["pv", "sp", "op"]) {
      const name = html("span", { cls: "awi-pid-name", text: f.toUpperCase() });
      const val = html("span", { cls: "awi-pid-val" });
      const input = html("input", { cls: "awi-pid-input", attrs: { type: "number", "aria-label": `New ${f.toUpperCase()}`, "data-lm-suppress-shortcuts": "true" } });
      const set2 = html("button", { cls: "awi-pid-set", text: "Set", attrs: { type: "button", "aria-label": `Set ${f.toUpperCase()}` } });
      const commit = () => this.enter(f, parseNumber(input.value));
      set2.addEventListener("click", commit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        } else if (e.key === "Escape") {
          input.value = "";
          input.blur();
        }
      });
      const row = html("div", { cls: `awi-pid-row awi-pid-${f}` }, [name, val, f === "pv" ? null : input, f === "pv" ? null : set2]);
      table.appendChild(row);
      this.rows[f] = { row, val, input, set: set2 };
    }
    this.note = html("div", { cls: "awi-pid-note", attrs: { role: "status", "aria-live": "polite" } });
    b.append(this.head, this.svgEl, table, this.note);
    this.pending = null;
    this.preview = null;
    this.svgEl.addEventListener("pointerdown", (e) => this.startDrag(e));
    this.listen("msg:custom", (msg) => {
      if (msg && msg.type === "rejected") this.showNote(`✖ ${msg.reason}`);
    });
    this.schedule();
  }
  num(name) {
    const v = this.get(name);
    if (v === null || v === void 0) return null;
    if (this.contract && (name === "sp" || name === "op")) return this.state[name];
    return parseNumber(v);
  }
  /** Operator-rule state, read through the contract. */
  get state() {
    return pidState((k) => this.get(k));
  }
  /** Apply an accepted operator action when no host owns the state (HOST-004). */
  applyLocally(changes) {
    const model = this.model;
    if (!this.contract || hostOwnsState(model)) return;
    for (const [k, v] of Object.entries(changes)) model.set(k, v);
    model.save_changes();
  }
  spLimits() {
    return [this.num("sp_min") ?? this.num("pv_min"), this.num("sp_max") ?? this.num("pv_max")];
  }
  showNote(text, buttons = []) {
    clear(this.note);
    this.note.appendChild(html("span", { text }));
    for (const btn of buttons) this.note.appendChild(btn);
  }
  /** Operator entry (IND-031, IND-032). */
  enter(field, value) {
    if (!this.interactive) return;
    const [min, max] = field === "sp" ? this.spLimits() : [this.num("op_min"), this.num("op_max")];
    const d = entryDecision({ field, mode: this.get("loop_mode"), value, current: this.num(field), min, max, confirmDelta: this.num("confirm_delta") });
    if (!d.ok) return this.showNote(`✖ ${d.reason}`);
    const send = (confirmed) => {
      this.model.send({ type: "set", field, value: d.value, confirmed });
      const r = operatorSet(this.state, field, d.value, confirmed);
      if (r.ok) this.applyLocally({ [r.field]: r.value });
      this.rows[field].input.value = "";
      this.showNote("");
      this.pending = null;
    };
    if (!d.confirm) return send(false);
    const fmt = this.get("format");
    const ok = html("button", { cls: "awi-pid-confirm", text: "Confirm", attrs: { type: "button" } });
    const cancel = html("button", { text: "Cancel", attrs: { type: "button" } });
    ok.addEventListener("click", () => send(true));
    cancel.addEventListener("click", () => {
      this.pending = null;
      this.showNote("");
    });
    this.pending = field;
    this.showNote(`Change ${field.toUpperCase()} ${formatValue(this.num(field), fmt)} → ${formatValue(d.value, fmt)}?`, [ok, cancel]);
    ok.focus();
  }
  /** Field and value under the pointer, or null when that field is not editable now. */
  dragTarget(e) {
    const g = this.barGeom;
    if (!g) return null;
    const p = svgPoint(this.svgEl, e);
    const field = p.x >= g.op[0] ? "op" : p.x <= g.pv[1] ? "sp" : null;
    if (!field || EDITABLE_IN2[field] !== this.get("loop_mode")) return null;
    const [a, b] = field === "sp" ? [this.num("pv_min"), this.num("pv_max")] : [this.num("op_min"), this.num("op_max")];
    return { field, value: fromFraction(linearHit(p.y, g.y0, g.y1), a, b) };
  }
  startDrag(e) {
    if (!this.interactive || this.get("mode") !== "control" || e.button !== 0) return;
    const first = this.dragTarget(e);
    if (!first) return;
    e.preventDefault();
    this.svgEl.setPointerCapture?.(e.pointerId);
    const move = (ev) => {
      const t = this.dragTarget(ev);
      if (t && t.field === first.field) this.preview = t;
      this.drawBars();
    };
    const up = (ev) => {
      this.svgEl.removeEventListener("pointermove", move);
      this.svgEl.removeEventListener("pointerup", up);
      this.svgEl.removeEventListener("pointercancel", up);
      const t = ev.type === "pointerup" ? this.preview : null;
      this.preview = null;
      this.drawBars();
      if (t) this.enter(t.field, Number(t.value.toPrecision(12)));
    };
    this.preview = first;
    this.drawBars();
    this.svgEl.addEventListener("pointermove", move);
    this.svgEl.addEventListener("pointerup", up);
    this.svgEl.addEventListener("pointercancel", up);
  }
  setMode(m) {
    if (!this.interactive || m === this.get("loop_mode")) return;
    this.model.send({ type: "loop_mode", mode: m });
    const r = loopModeChange(this.state, m);
    if (r.ok) this.applyLocally(r.changes);
    else if (this.contract && !hostOwnsState(this.model)) this.showNote(`✖ ${r.reason}`);
  }
  draw() {
    const fmt = this.get("format");
    const unit = this.get("unit");
    const mode = this.get("loop_mode");
    const control = this.get("mode") === "control";
    this.tagEl.textContent = this.get("tag") || this.get("label") || "PID";
    clear(this.modeBar);
    for (const m of this.get("modes") || []) {
      const btn = html("button", { cls: "awi-pid-mode", text: m, attrs: { type: "button", "aria-pressed": String(m === mode) } });
      btn.disabled = !control || !!this.get("disabled");
      btn.addEventListener("click", () => this.setMode(m));
      this.modeBar.appendChild(btn);
    }
    if (!(this.get("modes") || []).includes(mode)) this.modeBar.appendChild(html("span", { cls: "awi-pid-mode", text: mode }));
    const level = this.get("alarm_level") || "normal";
    for (const l of Object.keys(ALARM_TEXT2)) this.root.classList.toggle(`awi-alarm-${l}`, level === l);
    const pvText = withUnit(formatValue(parseNumber(this.get("pv")), fmt), unit);
    this.rows.pv.val.textContent = ALARM_TEXT2[level] ? `${pvText} ${ALARM_TEXT2[level]}` : pvText;
    this.rows.sp.val.textContent = withUnit(formatValue(this.num("sp"), fmt), unit);
    this.rows.op.val.textContent = withUnit(formatValue(this.num("op"), fmt), this.get("op_unit"));
    for (const f of ["sp", "op"]) {
      const r = this.rows[f];
      const editable = control && EDITABLE_IN2[f] === mode;
      r.input.hidden = !editable;
      r.set.hidden = !editable;
      r.input.disabled = !!this.get("disabled");
      r.set.disabled = !!this.get("disabled");
      const [min, max] = f === "sp" ? this.spLimits() : [this.num("op_min"), this.num("op_max")];
      r.input.min = String(min);
      r.input.max = String(max);
      r.input.step = "any";
      if (document.activeElement !== r.input && !r.input.value) r.input.placeholder = formatValue(this.num(f), fmt);
    }
    this.root.classList.toggle("awi-pid-man", mode === "MAN");
    this.drawBars();
    this.body.setAttribute("aria-label", `${this.tagEl.textContent}: PV ${this.rows.pv.val.textContent}, SP ${this.rows.sp.val.textContent}, OP ${this.rows.op.val.textContent}, mode ${mode}`);
  }
  drawBars() {
    const [w] = this.get("size");
    const h = 116;
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    s.style.height = `${h}px`;
    clear(s);
    const [pmin, pmax] = [this.num("pv_min"), this.num("pv_max")];
    const [omin, omax] = [this.num("op_min"), this.num("op_max")];
    const y0 = h - 14;
    const y1 = 8;
    const yOf = (v, a, b) => y0 - Math.min(1, Math.max(0, toFraction(v, a, b))) * (y0 - y1);
    const pvX = 44;
    const barW = 26;
    s.appendChild(svg("rect", { class: "awi-ai-track", x: pvX, y: y1, width: barW, height: y0 - y1 }));
    const pv = parseNumber(this.get("pv"));
    if (Number.isFinite(pv)) {
      const y = yOf(pv, pmin, pmax);
      s.appendChild(svg("rect", { class: "awi-pid-pv-bar", x: pvX, y, width: barW, height: y0 - y }));
    }
    for (const k of ["lolo", "lo", "hi", "hihi"]) {
      const v = this.num(k);
      if (v !== null) s.appendChild(svg("path", { class: `awi-ai-limit awi-ai-limit-${k}`, d: `M${pvX - 4} ${yOf(v, pmin, pmax)}H${pvX + barW + 4}` }));
    }
    const spShown = this.preview?.field === "sp" ? this.preview.value : this.num("sp");
    const sy = yOf(spShown, pmin, pmax);
    s.appendChild(svg("path", { class: "awi-pid-sp-mark", d: `M${pvX + barW + 2} ${sy}L${pvX + barW + 12} ${sy - 6}L${pvX + barW + 12} ${sy + 6}Z` }));
    s.appendChild(svgText("SP", { class: "awi-tick-label", x: pvX + barW + 14, y: sy, "dominant-baseline": "central" }));
    const tk = ticks(pmin, pmax, 4, 0);
    const tf = tickFormat(this.get("format"));
    for (const v of tk.major) {
      const y = yOf(v, pmin, pmax);
      s.appendChild(svgText(formatValue(v, tf), { class: "awi-tick-label", x: pvX - 6, y, "text-anchor": "end", "dominant-baseline": "central" }));
    }
    s.appendChild(svgText("PV", { class: "awi-tick-label", x: pvX + barW / 2, y: h - 2, "text-anchor": "middle" }));
    const opX = w - 50;
    this.barGeom = { pv: [0, pvX + barW + 30], op: [opX - 8, w], y0, y1 };
    const loop = this.get("loop_mode");
    const drag = this.get("mode") === "control" && this.interactive;
    s.classList.toggle("awi-pid-drag-sp", drag && loop === "AUTO");
    s.classList.toggle("awi-pid-drag-op", drag && loop === "MAN");
    s.appendChild(svg("rect", { class: "awi-ai-track", x: opX, y: y1, width: 18, height: y0 - y1 }));
    const opShown = this.preview?.field === "op" ? this.preview.value : this.num("op");
    const oy = yOf(opShown, omin, omax);
    s.appendChild(svg("rect", { class: "awi-pid-op-bar", x: opX, y: oy, width: 18, height: y0 - oy }));
    s.appendChild(svgText(formatValue(omax, tf), { class: "awi-tick-label", x: opX + 22, y: y1, "dominant-baseline": "central" }));
    s.appendChild(svgText(formatValue(omin, tf), { class: "awi-tick-label", x: opX + 22, y: y0, "dominant-baseline": "central" }));
    s.appendChild(svgText("OP", { class: "awi-tick-label", x: opX + 9, y: h - 2, "text-anchor": "middle" }));
  }
};

// js/src/widgets/picture.ts
var num = (v, d = 0) => v !== null && v !== "" && Number.isFinite(Number(v)) ? Number(v) : d;
function bytesOf2(buf) {
  return ArrayBuffer.isView(buf) ? new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength) : new Uint8Array(buf);
}
var PictureView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["background"]);
    this.commands = [];
    /** Decoded image of each image command. */
    this.images = /* @__PURE__ */ new Map();
    this.canvas = html("canvas", { cls: "awi-canvas" });
    this.body.appendChild(this.canvas);
    this.body.setAttribute("role", "img");
    this.listen("msg:custom", (msg, buffers) => this.onMessage(msg, buffers || []));
    this.canvas.addEventListener("pointerdown", (e) => {
      if (!this.interactive) return;
      const r = this.canvas.getBoundingClientRect();
      const [w, h] = this.get("size");
      const click = { x: (e.clientX - r.left) * w / (r.width || w), y: (e.clientY - r.top) * h / (r.height || h), button: e.button };
      this.model.send({ type: "click", ...click });
      if (!hostOwnsState(this.model)) {
        this.model.set("value", click);
        this.model.save_changes();
      }
    });
    this.canvas.addEventListener("contextmenu", (e) => this.interactive && e.preventDefault());
    this.model.send({ type: "sync_request" });
  }
  onMessage(msg, buffers) {
    if (!msg || typeof msg !== "object" || msg.type !== "draw") return;
    const m = msg;
    if (m.clear) {
      this.commands = [];
      this.images.clear();
    }
    const cmds = Array.isArray(m.commands) ? m.commands : [];
    const loading = [];
    for (const c of cmds) {
      if (!c || typeof c !== "object") continue;
      const cmd = c;
      const buf = typeof cmd.buffer === "number" ? buffers[cmd.buffer] : void 0;
      if (cmd.op === "image" && buf) loading.push(this.decode(cmd, buf));
      this.commands.push(cmd);
    }
    void Promise.all(loading).then(() => this.schedule());
  }
  async decode(c, buf) {
    const bytes = bytesOf2(buf);
    try {
      if (c.mime === "rgba") {
        const data = new ImageData(new Uint8ClampedArray(bytes.slice()), num(c.pw, 1), num(c.ph, 1));
        this.images.set(c, typeof createImageBitmap === "function" ? await createImageBitmap(data) : data);
      } else if (c.mime === "image/png" || c.mime === "image/jpeg") {
        this.images.set(c, await createImageBitmap(new Blob([bytes.slice()], { type: c.mime })));
      }
    } catch {
    }
  }
  draw() {
    const [w, h] = this.get("size");
    const dpr = typeof devicePixelRatio !== "undefined" && devicePixelRatio || 1;
    const c = this.canvas;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    }
    setAttr(this.body, "aria-label", this.get("label") || "Picture");
    const ctx = c.getContext?.("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const fg = getComputedStyle(this.root).getPropertyValue("--awi-fg").trim() || "#000";
    const color = (v) => v === "currentColor" ? fg : safeColor(v);
    const bg = color(this.get("background"));
    if (bg) {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    }
    for (const cmd of this.commands) this.drawCommand(ctx, cmd, color);
  }
  drawCommand(ctx, c, color) {
    const stroke = c.stroke ? color(c.stroke) : "";
    const fill = c.fill ? color(c.fill) : "";
    ctx.lineWidth = num(c.width, 1);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const strokeIt = () => {
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.stroke();
      }
    };
    const paint = () => {
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      strokeIt();
    };
    switch (c.op) {
      case "line":
        ctx.beginPath();
        ctx.moveTo(num(c.x0), num(c.y0));
        ctx.lineTo(num(c.x1), num(c.y1));
        strokeIt();
        break;
      case "rect":
        ctx.beginPath();
        ctx.rect(num(c.x), num(c.y), num(c.w), num(c.h));
        paint();
        break;
      case "arc": {
        const a0 = num(c.start) * Math.PI / 180;
        const a1 = num(c.end) * Math.PI / 180;
        ctx.beginPath();
        const full = Math.abs(num(c.end) - num(c.start)) >= 360;
        if (fill && !full) ctx.moveTo(num(c.cx), num(c.cy));
        ctx.arc(num(c.cx), num(c.cy), Math.max(0, num(c.r)), a0, a1);
        if (fill && !full) ctx.closePath();
        paint();
        break;
      }
      case "polygon": {
        const pts = (Array.isArray(c.points) ? c.points : []).filter((p) => Array.isArray(p));
        if (pts.length < 2) break;
        ctx.beginPath();
        ctx.moveTo(num(pts[0][0]), num(pts[0][1]));
        for (const p of pts.slice(1)) ctx.lineTo(num(p[0]), num(p[1]));
        if (c.closed) {
          ctx.closePath();
          paint();
        } else strokeIt();
        break;
      }
      case "text":
        ctx.fillStyle = fill || color("currentColor");
        ctx.font = `${num(c.size, 12)}px system-ui, sans-serif`;
        ctx.textAlign = { start: "left", middle: "center", end: "right" }[String(c.anchor)] || "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(String(c.text ?? ""), num(c.x), num(c.y));
        break;
      case "image": {
        const img = this.images.get(c);
        if (!img) break;
        if (img instanceof ImageData) ctx.putImageData(img, num(c.x), num(c.y));
        else ctx.drawImage(img, num(c.x), num(c.y), num(c.w, img.width), num(c.h, img.height));
        break;
      }
      default:
        break;
    }
  }
};

// js/src/contract/polar.ts
function screenAngle(theta, { unit = "deg", zero = "E", direction = "ccw" } = {}) {
  const deg = unit === "rad" ? theta * 180 / Math.PI : theta;
  return (zero === "N" ? 90 : 0) + (direction === "cw" ? -deg : deg);
}
function gammaToZ(re, im) {
  const den = (1 - re) ** 2 + im ** 2;
  return den === 0 ? [Infinity, 0] : [(1 - re * re - im * im) / den, 2 * im / den];
}
function radarRange(ranges, values, k) {
  const r = ranges[k];
  if (Array.isArray(r) && r.length === 2) {
    const [lo, hi] = r.map(Number);
    if (Number.isFinite(lo) && Number.isFinite(hi) && hi > lo) return [lo, hi];
  }
  return [0, Math.max(1e-12, ...values.map((v) => Number(v[k]) || 0))];
}

// js/src/widgets/polar.ts
var C = 100;
var numbers = (v) => Array.isArray(v) ? v.map((x) => typeof x === "number" || typeof x === "string" ? parseNumber(x) : NaN) : [];
var nameOf = (d) => d.name === void 0 || d.name === null ? "" : String(d.name);
var polarXY = (rNorm, phiDeg, R) => {
  const a = phiDeg * Math.PI / 180;
  return [C + rNorm * R * Math.cos(a), C - rNorm * R * Math.sin(a)];
};
var PolarView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "show_legend", "angle_unit", "zero", "direction", "r_max", "rings", "unit", "z0", "show_admittance", "axes", "ranges", "fill"]);
    this.shownRMax = 1;
    this.svgEl = svg("svg", { class: "awi-svg awi-polar", viewBox: "0 0 200 200" });
    this.body.appendChild(this.svgEl);
    this.body.setAttribute("role", "img");
    this.legend = html("div", { cls: "awi-legend" });
    this.root.appendChild(this.legend);
    if (this.kind === "polar") this.buildRadialRange();
    this.schedule();
  }
  // -- radial range (CHART-108): mouse wheel on the plot, or typed ---------------------------
  buildRadialRange() {
    const field = this.rField = html("input", { cls: "awi-entry", attrs: { type: "text", inputmode: "decimal", "aria-label": "Radial range maximum", "data-lm-suppress-shortcuts": "true" } });
    const msg = this.rMsg = html("span", { cls: "awi-entry-msg", attrs: { role: "alert" } });
    const auto = html("button", { text: "Auto", attrs: { type: "button", title: "Automatic radial range" } });
    auto.addEventListener("click", () => this.setRMax(null));
    field.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key !== "Enter") return;
      e.preventDefault();
      const r = checkEntry(field.value, { min: Number.MIN_VALUE, max: Number.MAX_VALUE, unit: this.get("unit") || "", format: "%.4g" });
      msg.textContent = r.ok ? "" : "Enter a positive number";
      field.toggleAttribute("aria-invalid", !r.ok);
      if (r.ok && r.value !== void 0) this.setRMax(r.value);
    });
    this.rRow = html("div", { cls: "awi-axes-panel" }, [html("span", { cls: "awi-axis-row" }, [html("b", { text: "r max" }), field]), auto, msg]);
    this.root.appendChild(this.rRow);
    this.svgEl.addEventListener(
      "wheel",
      (e) => {
        if (!this.canZoom) return;
        e.preventDefault();
        this.setRMax(this.shownRMax * (e.deltaY < 0 ? 1 / 1.25 : 1.25));
      },
      { passive: false }
    );
  }
  get canZoom() {
    return !this.get("disabled") && this.stale === "live";
  }
  setRMax(v) {
    if (!this.canZoom) return;
    this.model.set("r_max", v);
    this.model.save_changes();
    this.schedule();
  }
  seriesColor(s, i) {
    return safeColor(s.color) || `var(--awi-trace-${i % 8})`;
  }
  draw() {
    const s = this.svgEl;
    clear(s);
    const series = this.get("value");
    if (this.kind === "polar") this.drawPolar(s, series);
    else if (this.kind === "smith") this.drawSmith(s, series);
    else if (this.kind === "radar") this.drawRadar(s, series);
    clear(this.legend);
    setHidden(this.legend, !this.get("show_legend") || !series.length);
    series.forEach((d, i) => {
      const sw = html("span", { cls: "awi-swatch" });
      sw.style.background = this.seriesColor(d, i);
      this.legend.appendChild(html("span", { cls: "awi-legend-item" }, [sw, document.createTextNode(nameOf(d))]));
    });
    const n = series.length;
    setAttr(this.body, "aria-label", `${this.get("label") || this.kind}: ${n} data set${n === 1 ? "" : "s"}${n ? ` (${series.map(nameOf).join(", ")})` : ""}`);
  }
  path(points, color, { closed = false, fill = false, markers = true, line = true, title } = {}) {
    const g = svg("g");
    if (line && points.length > 1) {
      const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join("") + (closed ? "Z" : "");
      const p = svg("path", { class: "awi-series-line", d });
      p.style.stroke = color;
      if (fill) {
        p.style.fill = color;
        p.style.fillOpacity = "0.2";
      } else p.style.fill = "none";
      g.appendChild(p);
    }
    if (markers) {
      points.forEach(([x, y], i) => {
        const m = svg("circle", { class: "awi-series-marker", cx: x.toFixed(2), cy: y.toFixed(2), r: 2.4 });
        m.style.fill = color;
        if (title) {
          const t = svg("title");
          t.textContent = title(i);
          m.appendChild(t);
        }
        g.appendChild(m);
      });
    }
    return g;
  }
  // -- polar ----------------------------------------------------------------------------
  drawPolar(s, series) {
    const R = 80;
    const opts = { unit: this.get("angle_unit"), zero: this.get("zero"), direction: this.get("direction") };
    const rings = this.get("rings") ?? 4;
    let rmax = this.get("r_max") ?? NaN;
    if (!(rmax > 0)) {
      rmax = 0;
      for (const d of series) for (const r of numbers(d.r)) if (Number.isFinite(r)) rmax = Math.max(rmax, Math.abs(r));
      rmax = rmax || 1;
      const t = niceTicks(0, rmax, rings);
      if (t[t.length - 1] < rmax) rmax = t[t.length - 1] + (t[1] - t[0]);
      else rmax = t[t.length - 1];
    }
    this.shownRMax = rmax;
    if (this.rField && document.activeElement !== this.rField) this.rField.value = formatValue(rmax, "%.4g");
    const grid = svg("g", { class: "awi-polar-grid" });
    for (const v of niceTicks(0, rmax, rings).filter((v2) => v2 > 0)) {
      grid.appendChild(svg("circle", { cx: C, cy: C, r: v / rmax * R }));
      grid.appendChild(svgText(formatValue(v, "%.3g"), { class: "awi-tick-label", x: C + 2, y: C - v / rmax * R - 1 }));
    }
    for (let k = 0; k < 12; k++) {
      const theta = opts.unit === "rad" ? k * Math.PI / 6 : k * 30;
      const phi = screenAngle(theta, opts);
      const [x, y] = polarXY(1, phi, R);
      grid.appendChild(svg("line", { x1: C, y1: C, x2: x, y2: y }));
      const [lx, ly] = polarXY(1.12, phi, R);
      const label = opts.unit === "rad" ? `${formatValue(k / 6, "%.3g")}π` : `${k * 30}°`;
      grid.appendChild(svgText(label, { class: "awi-tick-label", x: lx, y: ly, "text-anchor": "middle", "dominant-baseline": "central" }));
    }
    s.appendChild(grid);
    const unit = this.get("unit");
    series.forEach((d, i) => {
      const r = numbers(d.r);
      const th = numbers(d.theta);
      const pts = r.map((v, k) => polarXY(Math.min(1.05, Math.abs(v) / rmax), screenAngle(th[k], opts) + (v < 0 ? 180 : 0), R)).filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
      s.appendChild(
        this.path(pts, this.seriesColor(d, i), {
          markers: d.style !== "line",
          line: d.style !== "markers",
          title: (k) => `${nameOf(d)}: ${formatValue(r[k], "%.4g")}${unit ? ` ${unit}` : ""} ∠ ${formatValue(th[k], "%.4g")}${opts.unit === "rad" ? " rad" : "°"}`
        })
      );
    });
  }
  // -- smith --------------------------------------------------------------------------------
  drawSmith(s, series) {
    const R = 90;
    const clipId = `${this.id}-smith`;
    const defs = svg("defs", {}, [svg("clipPath", { id: clipId }, [svg("circle", { cx: C, cy: C, r: R })])]);
    s.appendChild(defs);
    const grid = svg("g", { class: "awi-polar-grid awi-smith-grid", "clip-path": `url(#${clipId})` });
    grid.appendChild(svg("circle", { class: "awi-smith-outer", cx: C, cy: C, r: R }));
    grid.appendChild(svg("line", { x1: C - R, y1: C, x2: C + R, y2: C }));
    const values = [0.2, 0.5, 1, 2, 5];
    for (const r of values) {
      grid.appendChild(svg("circle", { cx: C + r / (1 + r) * R, cy: C, r: R / (1 + r) }));
    }
    for (const x of values) {
      for (const sign of [1, -1]) {
        grid.appendChild(svg("circle", { cx: C + R, cy: C - sign * R / x, r: R / x }));
      }
    }
    if (this.get("show_admittance")) {
      for (const g of values) grid.appendChild(svg("circle", { class: "awi-smith-adm", cx: C - g / (1 + g) * R, cy: C, r: R / (1 + g) }));
    }
    s.appendChild(grid);
    for (const r of values) {
      s.appendChild(svgText(String(r), { class: "awi-tick-label", x: C + (r - 1) / (r + 1) * R + 1, y: C - 2 }));
    }
    for (const x of values) {
      for (const sign of [1, -1]) {
        const re = (x * x - 1) / (x * x + 1);
        const im = sign * 2 * x / (x * x + 1);
        s.appendChild(svgText(`${sign > 0 ? "+" : "−"}j${x}`, { class: "awi-tick-label", x: C + re * R * 1.08, y: C - im * R * 1.08, "text-anchor": "middle", "dominant-baseline": "central" }));
      }
    }
    const z0 = this.get("z0") ?? 50;
    series.forEach((d, i) => {
      const re = numbers(d.re);
      const im = numbers(d.im);
      const pts = re.map((v, k) => [C + v * R, C - im[k] * R]).filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
      s.appendChild(
        this.path(pts, this.seriesColor(d, i), {
          markers: d.style !== "line",
          line: d.style !== "markers",
          title: (k) => {
            const [zr, zi] = gammaToZ(re[k], im[k]);
            return `${nameOf(d)}: Z = ${formatValue(zr * z0, "%.4g")} ${zi * z0 < 0 ? "−" : "+"} j${formatValue(Math.abs(zi * z0), "%.4g")} Ω  |Γ| = ${formatValue(Math.hypot(re[k], im[k]), "%.3g")}`;
          }
        })
      );
    });
  }
  // -- radar ---------------------------------------------------------------------------------
  drawRadar(s, series) {
    const R = 72;
    const axes = this.get("axes") ?? [];
    const values = series.map((d) => numbers(d.values));
    const n = axes.length || Math.max(0, ...values.map((v) => v.length));
    if (n < 3) {
      s.appendChild(svgText("radar needs ≥ 3 axes", { class: "awi-tick-label", x: C, y: C, "text-anchor": "middle" }));
      return;
    }
    const ranges = this.get("ranges") ?? [];
    const range = (k) => radarRange(ranges, values, k);
    const phi = (k) => 90 - 360 * k / n;
    const grid = svg("g", { class: "awi-polar-grid" });
    for (const f of [0.25, 0.5, 0.75, 1]) {
      const d = Array.from({ length: n }, (_, k) => polarXY(f, phi(k), R)).map(([x, y], k) => `${k ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join("") + "Z";
      grid.appendChild(svg("path", { d, fill: "none" }));
    }
    for (let k = 0; k < n; k++) {
      const [x, y] = polarXY(1, phi(k), R);
      grid.appendChild(svg("line", { x1: C, y1: C, x2: x, y2: y }));
      const [lx, ly] = polarXY(1.18, phi(k), R);
      grid.appendChild(svgText(String(axes[k] ?? `axis ${k + 1}`), { class: "awi-tick-label awi-radar-axis", x: lx, y: ly, "text-anchor": Math.abs(lx - C) < 5 ? "middle" : lx > C ? "start" : "end", "dominant-baseline": "central" }));
      const [tx, ty] = polarXY(1, phi(k), R);
      grid.appendChild(svgText(formatValue(range(k)[1], "%.3g"), { class: "awi-tick-label awi-radar-max", x: tx + 2, y: ty - 3 }));
    }
    s.appendChild(grid);
    series.forEach((d, i) => {
      const vals = values[i];
      const pts = Array.from({ length: n }, (_, k) => {
        const [lo, hi] = range(k);
        const f = Math.max(0, Math.min(1.05, ((Number.isFinite(vals[k]) ? vals[k] : 0) - lo) / (hi - lo || 1)));
        return polarXY(f, phi(k), R);
      });
      s.appendChild(this.path(pts, this.seriesColor(d, i), { closed: true, fill: !!this.get("fill"), title: (k) => `${nameOf(d)} · ${axes[k] ?? k}: ${formatValue(vals[k], "%.4g")}` }));
    });
  }
};

// js/src/contract/process.ts
function processCommand(command, s) {
  if (command === "auto") return { auto: true };
  if (command === "manual") return { auto: false };
  if (!s.commands.includes(command) || !s.simulate) return {};
  const out = {};
  if (s.position !== null && (command === "open" || command === "close")) out.position = command === "open" ? 100 : 0;
  if (command in s.simulated) out.value = s.simulated[command];
  return out;
}
function positionDemand(percent, s) {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100 || !s.simulate) return {};
  return { position: percent, value: percent > 0 ? "open" : "closed" };
}

// js/src/contract/synoptic.ts
var PNG = [137, 80, 78, 71, 13, 10, 26, 10];
var JPEG = [255, 216, 255];
var startsWith = (b, sig) => b.length >= sig.length && sig.every((v, i) => b[i] === v);
function imageMime(bytes) {
  if (!bytes.length) return "";
  if (startsWith(bytes, PNG)) return "image/png";
  if (startsWith(bytes, JPEG)) return "image/jpeg";
  const head = bytes.subarray(0, 2048);
  for (let i = 0; i + 4 <= head.length; i++) {
    if (head[i] === 60 && head[i + 1] === 115 && head[i + 2] === 118 && head[i + 3] === 103) return "image/svg+xml";
  }
  return "";
}

// js/src/widgets/process.ts
var STATE_TEXT5 = {
  open: "OPEN",
  closed: "CLOSED",
  transit: "TRANSIT",
  fault: "FAULT",
  stopped: "STOPPED",
  running: "RUNNING",
  forward: "FWD",
  reverse: "REV"
};
var scope2 = globalThis;
var OPEN = scope2.__awiFaceplate || (scope2.__awiFaceplate = { current: null });
var COMMAND_TEXT = { open: "Open", close: "Close", start: "Start", stop: "Stop", forward: "Forward", reverse: "Reverse" };
var ProcessView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "position", "orientation", "animate", "direction", "tag", "auto", "simulate", "commands"]);
    this.fpMain = null;
    this.fpPos = null;
    this.svgEl = svg("svg", { class: "awi-svg", viewBox: "0 0 100 100", "aria-hidden": "true" });
    this.stateEl = html("div", { cls: "awi-process-state" });
    this.body.append(this.svgEl);
    this.root.append(this.stateEl);
    this.faceplate = null;
    this.body.addEventListener("click", () => this.interactive && this.toggleFaceplate());
    this.body.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && this.interactive) {
        e.preventDefault();
        this.toggleFaceplate();
      } else if (e.key === "Escape") this.closeFaceplate();
    });
    this._disposers.push(() => this.closeFaceplate(false));
    this.schedule();
  }
  // -- faceplate (SCADA-009) ------------------------------------------------------
  toggleFaceplate() {
    if (this.faceplate) this.closeFaceplate();
    else this.openFaceplate();
  }
  closeFaceplate(refocus = true) {
    if (!this.faceplate) return;
    this.faceplate.remove();
    this.faceplate = null;
    this.fpMain = null;
    this.fpPos = null;
    if (this._outside) document.removeEventListener("pointerdown", this._outside, true);
    if (OPEN.current === this) OPEN.current = null;
    if (refocus) this.body.focus({ preventScroll: true });
  }
  openFaceplate() {
    if (OPEN.current && OPEN.current !== this) OPEN.current.closeFaceplate(false);
    OPEN.current = this;
    this._outside || (this._outside = (e) => {
      if (!e.composedPath().includes(this.root)) this.closeFaceplate(false);
    });
    document.addEventListener("pointerdown", this._outside, true);
    const fp = html("div", { cls: "awi-faceplate", attrs: { role: "dialog", "aria-label": `${this.get("tag") || this.get("label") || this.kind} faceplate` } });
    this.faceplate = fp;
    this.root.appendChild(fp);
    this.renderFaceplate();
    fp.addEventListener("keydown", (e) => e.key === "Escape" && this.closeFaceplate());
    fp.querySelector("button")?.focus();
  }
  /** Faceplate state for the command rules (x-awi-simulated in the schema). */
  get processState() {
    const pos = this.get("position");
    return {
      auto: !!this.get("auto"),
      simulate: !!this.get("simulate"),
      commands: this.get("commands") || [],
      simulated: this.contract?.traits.commands.simulated ?? {},
      position: pos === null || pos === void 0 ? null : Number(pos)
    };
  }
  renderFaceplate() {
    if (!this.faceplate) return;
    if (!this.fpMain) {
      this.fpMain = html("div");
      this.faceplate.appendChild(this.fpMain);
    }
    if (this.fpMain.parentNode !== this.faceplate) this.faceplate.prepend(this.fpMain);
    const fp = this.fpMain;
    clear(fp);
    const head = html("div", { cls: "awi-faceplate-head" }, [
      html("span", { text: this.get("tag") || this.get("label") || this.kind }),
      html("button", { cls: "awi-fp-close", text: "×", attrs: { type: "button", "aria-label": "Close" } })
    ]);
    head.querySelector("button")?.addEventListener("click", () => this.closeFaceplate());
    fp.appendChild(head);
    fp.appendChild(html("div", { cls: "awi-fp-row", text: `State: ${STATE_TEXT5[this.get("value")] || this.get("value")}` }));
    const auto = !!this.get("auto");
    const mode = html("div", { cls: "awi-fp-row awi-fp-mode" });
    for (const m of ["auto", "manual"]) {
      const b = html("button", { text: m === "auto" ? "Auto" : "Manual", attrs: { type: "button", "aria-pressed": String(m === "auto" === auto) } });
      b.addEventListener("click", () => this.send(m));
      mode.appendChild(b);
    }
    fp.appendChild(mode);
    const cmds = html("div", { cls: "awi-fp-row awi-fp-commands" });
    for (const c of this.get("commands") || []) {
      const b = html("button", { text: COMMAND_TEXT[c] || c, attrs: { type: "button" } });
      b.disabled = auto;
      b.title = auto ? "Switch to manual to operate" : "";
      b.addEventListener("click", () => this.send(c));
      cmds.appendChild(b);
    }
    fp.appendChild(cmds);
    this.renderPositionRow();
  }
  /** Control valve position demand (API-014): slider and typed value, manual mode only. */
  renderPositionRow() {
    const pos = this.get("position");
    const show = this.kind === "valve" && pos !== null && pos !== void 0;
    if (!show) {
      this.fpPos?.row.remove();
      return;
    }
    if (!this.fpPos || this.fpPos.row.parentNode !== this.faceplate) {
      const slider2 = html("input", { cls: "awi-fp-slider", attrs: { type: "range", min: "0", max: "100", step: "1", "aria-label": "Position demand %", "data-lm-suppress-shortcuts": "true" } });
      const field2 = html("input", { cls: "awi-entry", attrs: { type: "text", inputmode: "decimal", "aria-label": "Position demand % (0 to 100)", "data-lm-suppress-shortcuts": "true" } });
      const msg = html("div", { cls: "awi-entry-msg", attrs: { role: "alert" } });
      const send = (v) => {
        if (!this.interactive) return;
        this.model.send({ type: "command", command: "position", value: v });
        this.applyLocally(positionDemand(v, this.processState));
      };
      slider2.addEventListener("change", () => send(Number(slider2.value)));
      field2.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key !== "Enter") return;
        e.preventDefault();
        const r = checkEntry(field2.value, { min: 0, max: 100, unit: "%", format: "%.0f" });
        msg.textContent = r.ok ? "" : r.reason;
        field2.toggleAttribute("aria-invalid", !r.ok);
        if (r.ok) send(r.value);
      });
      const row = html("div", { cls: "awi-fp-row awi-fp-position" }, [html("span", { text: "Position %" }), slider2, field2, msg]);
      this.fpPos = { row, slider: slider2, field: field2, msg };
      this.faceplate?.appendChild(row);
    }
    const { slider, field } = this.fpPos;
    const manual = !this.get("auto");
    slider.disabled = !manual;
    field.disabled = !manual;
    if (document.activeElement !== slider) slider.value = String(Math.round(Number(pos)));
    if (document.activeElement !== field) field.value = String(Math.round(Number(pos)));
  }
  /** Faceplate command: always sent to the host; applied by the front end when no host owns the state (HOST-004). */
  send(command) {
    if (!this.interactive) return;
    this.model.send({ type: "command", command });
    this.applyLocally(processCommand(command, this.processState));
  }
  applyLocally(changes) {
    const model = this.model;
    if (hostOwnsState(model) || Object.keys(changes).length === 0) return;
    for (const [name, v] of Object.entries(changes)) model.set(name, v);
    model.save_changes();
  }
  // -- drawing -------------------------------------------------------------------
  draw() {
    const state = this.get("value");
    const r = this.root;
    for (const s2 of Object.keys(STATE_TEXT5)) r.classList.toggle(`awi-st-${s2}`, s2 === state);
    r.classList.toggle("awi-anim", !!this.get("animate"));
    const s = this.svgEl;
    clear(s);
    ({ valve: () => this.drawValve(s, state), pump: () => this.drawPump(s, state), motor: () => this.drawMotor(s, state) })[this.kind]?.();
    if (state === "fault") s.appendChild(svgText("!", { class: "awi-fault-mark", x: 88, y: 16, "text-anchor": "middle", "dominant-baseline": "central" }));
    const pos = this.get("position");
    const parts = [STATE_TEXT5[state] || state];
    if (this.kind === "valve" && pos !== null && pos !== void 0) parts.push(`${Math.round(Number(pos))} %`);
    if (!this.get("auto")) parts.push("MAN");
    this.stateEl.textContent = parts.join(" · ");
    const b = this.body;
    b.tabIndex = this.get("mode") === "control" ? 0 : -1;
    b.setAttribute("role", this.get("mode") === "control" ? "button" : "img");
    b.setAttribute("aria-label", `${this.get("tag") || this.get("label") || this.kind}: ${parts.join(", ")}`);
    if (this.get("mode") === "control") b.setAttribute("aria-haspopup", "dialog");
    else b.removeAttribute("aria-haspopup");
    this.renderFaceplate();
  }
  drawValve(s, state) {
    const g = svg("g", { transform: this.get("orientation") === "vertical" ? "rotate(90 50 50)" : "" });
    const pos = this.get("position");
    g.appendChild(svg("line", { class: "awi-stem", x1: 50, y1: 55, x2: 50, y2: 30 }));
    g.appendChild(svg("path", { class: "awi-actuator", d: "M34 30 A16 14 0 0 1 66 30 Z" }));
    const left = svg("path", { class: "awi-valve-body awi-vl", d: "M14 36 L50 55 L14 74 Z" });
    const right = svg("path", { class: "awi-valve-body awi-vr", d: "M86 36 L50 55 L86 74 Z" });
    g.append(left, right);
    if (pos !== null && pos !== void 0 && state !== "fault") {
      g.appendChild(svg("rect", { class: "awi-track", x: 14, y: 82, width: 72, height: 6, rx: 2 }));
      g.appendChild(svg("rect", { class: "awi-fill", x: 14, y: 82, width: 72 * Math.max(0, Math.min(100, Number(pos))) / 100, height: 6, rx: 2 }));
    }
    s.appendChild(g);
  }
  drawPump(s, state) {
    const rot = { right: 0, down: 90, left: 180, up: 270 }[String(this.get("direction"))] || 0;
    const g = svg("g", { transform: `rotate(${rot} 50 50)` });
    g.appendChild(svg("path", { class: "awi-pump-outlet", d: "M50 18 H88 V36 H72" }));
    g.appendChild(svg("circle", { class: "awi-pump-body", cx: 50, cy: 52, r: 32 }));
    const imp = svg("g", { class: "awi-rotor" });
    for (const a of [0, 120, 240]) imp.appendChild(svg("path", { class: "awi-blade", d: "M50 52 Q58 40 50 28", transform: `rotate(${a} 50 52)` }));
    imp.style.transformOrigin = "50px 52px";
    g.appendChild(imp);
    s.appendChild(g);
    s.appendChild(svg("path", { class: "awi-base", d: "M22 94 L34 80 H66 L78 94 Z" }));
    void state;
  }
  drawMotor(s, state) {
    s.appendChild(svg("rect", { class: "awi-motor-shaft", x: 82, y: 45, width: 14, height: 10, rx: 2 }));
    s.appendChild(svg("circle", { class: "awi-motor-body", cx: 46, cy: 50, r: 36 }));
    s.appendChild(svgText("M", { class: "awi-motor-letter", x: 46, y: 51, "text-anchor": "middle", "dominant-baseline": "central" }));
    if (state === "forward" || state === "reverse") {
      const arc = svg("g", { class: `awi-rotor${state === "reverse" ? " awi-ccw" : ""}` });
      const d = state === "forward" ? "M46 8 A42 42 0 0 1 84 32" : "M84 32 A42 42 0 0 0 46 8";
      arc.appendChild(svg("path", { class: "awi-dir-arrow", d }));
      const tip = state === "forward" ? "M84 32 l-9 -1 l5 -7 Z" : "M46 8 l8 -4 l0 8 Z";
      arc.appendChild(svg("path", { class: "awi-dir-tip", d: tip }));
      s.appendChild(arc);
    }
  }
};
var PIPE_PATHS = {
  straight: ["M0 50 H100"],
  elbow: ["M0 50 H50 V100"],
  tee: ["M0 50 H100", "M50 50 V100"],
  cross: ["M0 50 H100", "M50 0 V100"]
};
function flowPath(parent, d, { flow, reverse, width, color, animate }) {
  const pipe = svg("path", { class: "awi-pipe", d, "stroke-width": width, fill: "none" });
  const fluid = svg("path", { class: `awi-pipe-fluid${flow ? " awi-flowing" : ""}${reverse ? " awi-reverse" : ""}${animate ? " awi-anim-flow" : ""}`, d, "stroke-width": width * 0.45, fill: "none" });
  if (color) fluid.style.stroke = color;
  parent.append(pipe, fluid);
}
var PipeView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "shape", "rotation", "flow_animation", "flow_direction", "fluid_color", "thickness"]);
    this.svgEl = svg("svg", { class: "awi-svg", viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.body.setAttribute("role", "img");
    this.schedule();
  }
  draw() {
    const s = this.svgEl;
    clear(s);
    const g = svg("g", { transform: `rotate(${Number(this.get("rotation")) || 0} 50 50)` });
    const [w, h] = this.get("size");
    const width = (Number(this.get("thickness")) || 14) * (100 / Math.min(w, h));
    for (const d of PIPE_PATHS[this.get("shape")] || PIPE_PATHS.straight) {
      flowPath(g, d, { flow: !!this.get("value"), reverse: this.get("flow_direction") === "reverse", width, color: safeColor(this.get("fluid_color")), animate: !!this.get("flow_animation") });
    }
    s.appendChild(g);
    this.body.setAttribute("aria-label", `${this.get("label") || "Pipe"}: ${this.get("value") ? `flow ${this.get("flow_direction")}` : "no flow"}`);
  }
};
var IMAGE_MIMES = ["image/png", "image/jpeg", "image/svg+xml"];
var SynopticView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["items", "pipes", "background", "background_mime"]);
    this.body.classList.add("awi-synoptic-body");
    this.bg = html("img", { cls: "awi-synoptic-bg", attrs: { alt: "" } });
    this.pipeLayer = svg("svg", { class: "awi-synoptic-pipes", "aria-hidden": "true" });
    this.childLayer = html("div", { cls: "awi-synoptic-children" });
    this.body.append(this.bg, this.pipeLayer, this.childLayer);
    this.body.setAttribute("role", "group");
    this.views = /* @__PURE__ */ new Map();
    this.bgUrl = null;
    this._disposers.push(() => {
      if (this.bgUrl) URL.revokeObjectURL(this.bgUrl);
      for (const { view } of this.views.values()) view?.remove?.();
    });
    this.listen("change:items", () => this.syncChildren());
    this.listen("change:background", () => this.updateBackground());
    this.updateBackground();
    this.syncChildren();
    this.schedule();
  }
  updateBackground() {
    if (this.bgUrl) URL.revokeObjectURL(this.bgUrl);
    this.bgUrl = null;
    const bytes = this.get("background");
    const given = this.get("background_mime");
    const mime = IMAGE_MIMES.includes(given) ? given : imageMime(bytes);
    if (bytes.length && mime) {
      this.bgUrl = URL.createObjectURL(new Blob([bytes.slice()], { type: mime }));
      this.bg.src = this.bgUrl;
      this.bg.hidden = false;
    } else {
      this.bg.removeAttribute("src");
      this.bg.hidden = true;
    }
  }
  async syncChildren() {
    const items = this.get("items");
    const wm = this.model.widget_manager;
    const wanted = /* @__PURE__ */ new Set();
    for (const it of items) {
      const ref = typeof it.widget === "string" ? it.widget.replace(/^IPY_MODEL_/, "") : null;
      if (!ref) continue;
      wanted.add(ref);
      let entry = this.views.get(ref);
      if (!entry) {
        const holder = html("div", { cls: "awi-synoptic-item" });
        entry = { el: holder, view: null };
        this.views.set(ref, entry);
        this.childLayer.appendChild(holder);
        if (wm && typeof wm.get_model === "function" && typeof wm.create_view === "function") {
          try {
            const child = await wm.get_model(ref);
            const view = await wm.create_view(child, {});
            entry.view = view;
            holder.appendChild(view.el);
            view.trigger?.("displayed");
          } catch {
            holder.textContent = "⚠ widget unavailable";
          }
        } else {
          holder.textContent = "⚠ nested widgets need a Jupyter host";
        }
      }
      entry.el.style.left = `${Number(it.x) || 0}px`;
      entry.el.style.top = `${Number(it.y) || 0}px`;
    }
    for (const [ref, entry] of this.views) {
      if (!wanted.has(ref)) {
        entry.view?.remove?.();
        entry.el.remove();
        this.views.delete(ref);
      }
    }
  }
  draw() {
    const [w, h] = this.get("size");
    this.pipeLayer.setAttribute("viewBox", `0 0 ${w} ${h}`);
    clear(this.pipeLayer);
    for (const p of this.get("pipes")) {
      const pts = (Array.isArray(p.points) ? p.points : []).filter((q) => Array.isArray(q));
      if (pts.length < 2) continue;
      const d = pts.map((q, i) => `${i ? "L" : "M"}${Number(q[0]) || 0} ${Number(q[1]) || 0}`).join("");
      flowPath(this.pipeLayer, d, { flow: !!p.flow, reverse: p.direction === "reverse", width: Number(p.thickness) || 10, color: safeColor(p.color), animate: true });
    }
    this.body.setAttribute("aria-label", String(this.get("label") || "Synoptic"));
  }
};

// js/src/widgets/linear.ts
var LinearView = class extends NumericView {
  constructor(model, el) {
    super(model, el, ["orientation", "markers", "fill_color", "segments", "peak", "peak_hold"]);
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.staticLayer = svg("g");
    this.dynamicLayer = svg("g", { class: "awi-dynamic" });
    this.svgEl.append(this.staticLayer, this.dynamicLayer);
    this._staticKey = "";
    const hit = (e, final) => {
      const p = svgPoint(this.svgEl, e);
      const t = this.track;
      const f = this.vertical ? linearHit(p.y, t.y1, t.y0) : linearHit(p.x, t.x0, t.x1);
      this.commitFraction(f, final);
    };
    this.drag(this.svgEl, { start: (e) => hit(e, false), move: (e) => hit(e, false), end: (e) => hit(e, true) });
    this.schedule();
  }
  get vertical() {
    return this.kind === "tank" || this.kind === "thermometer" || this.get("orientation") !== "horizontal";
  }
  layout() {
    const [w, h] = this.get("size");
    const labelSpace = 40;
    if (this.vertical) {
      const bulb = this.kind === "thermometer" ? 16 : 0;
      const x0 = labelSpace + 8;
      const width = this.kind === "thermometer" ? 14 : Math.max(12, w - x0 - (this.kind === "tank" ? 30 : 10));
      return { w, h, x0, x1: x0 + width, y0: 10, y1: h - 10 - bulb * 2, bulb };
    }
    const trackH = Math.min(18, Math.max(8, h - 40));
    return { w, h, x0: 14, x1: w - 14, y0: 8, y1: 8 + trackH, bulb: 0 };
  }
  pointAt(f) {
    const t = this.track;
    return this.vertical ? t.y1 - f * (t.y1 - t.y0) : t.x0 + f * (t.x1 - t.x0);
  }
  buildStatic() {
    const t = this.track = this.layout();
    this.svgEl.setAttribute("viewBox", `0 0 ${t.w} ${t.h}`);
    const layer = this.staticLayer;
    clear(layer);
    const skin = this.skinPart("background", t.w, t.h);
    if (skin) layer.appendChild(skin);
    const fill = safeColor(this.get("fill_color"));
    if (fill) this.root.style.setProperty("--awi-fill", fill);
    else this.root.style.removeProperty("--awi-fill");
    const housing = this.kind === "vumeter" ? null : this.skinPart("housing", t.x1 - t.x0, t.y1 - t.y0, t.x0, t.y0, "none");
    if (housing) {
      layer.appendChild(housing);
    } else if (this.kind === "thermometer") {
      const cx = (t.x0 + t.x1) / 2;
      layer.appendChild(svg("rect", { class: "awi-track", x: t.x0, y: t.y0 - 6, width: t.x1 - t.x0, height: t.y1 - t.y0 + 12, rx: 7 }));
      layer.appendChild(svg("circle", { class: "awi-track", cx, cy: t.y1 + t.bulb + 4, r: t.bulb }));
      layer.appendChild(svg("circle", { class: "awi-fill", cx, cy: t.y1 + t.bulb + 4, r: t.bulb - 4 }));
    } else if (this.kind !== "vumeter") {
      layer.appendChild(svg("rect", { class: "awi-track", x: t.x0, y: t.y0, width: t.x1 - t.x0, height: t.y1 - t.y0, rx: this.kind === "tank" ? 8 : 3 }));
    }
    if (this.get("show_limits")) {
      for (const z of this.limitZones()) {
        const a = this.pointAt(z.from);
        const b = this.pointAt(z.to);
        const attrs = this.vertical ? { x: t.x0 - 6, y: Math.min(a, b), width: 4, height: Math.abs(b - a) } : { x: Math.min(a, b), y: t.y1 + 2, width: Math.abs(b - a), height: 4 };
        layer.appendChild(svg("rect", { class: `awi-zone awi-zone-${z.level}`, ...attrs }));
      }
    }
    const named = this.valueLabels.filter((l) => l.value >= this.min && l.value <= this.max);
    const tk = named.length ? { major: named.map((l) => l.value), minor: [] } : ticks(this.min, this.max, Number(this.get("ticks")), Number(this.get("minor_ticks")), this.scaleType);
    const fmt = tickFormat(this.get("format"));
    const tickPath = (vals, len) => vals.map((v) => {
      const p = this.pointAt(this.frac(v));
      return this.vertical ? `M${t.x0 - 8 - len} ${p}H${t.x0 - 8}` : `M${p} ${t.y1 + 8}V${t.y1 + 8 + len}`;
    }).join("");
    layer.appendChild(svg("path", { class: "awi-tick-minor", d: tickPath(tk.minor, 3) }));
    layer.appendChild(svg("path", { class: "awi-tick-major", d: tickPath(tk.major, 6) }));
    for (const v of tk.major) {
      const p = this.pointAt(this.frac(v));
      const attrs = this.vertical ? { x: t.x0 - 17, y: p, "text-anchor": "end", "dominant-baseline": "central" } : { x: p, y: t.y1 + 24, "text-anchor": "middle" };
      layer.appendChild(svgText(named.find((l) => l.value === v)?.label ?? formatValue(v, fmt), { class: "awi-tick-label", ...attrs }));
    }
    if (this.kind === "tank") {
      for (const m of this.get("markers") || []) {
        const y = this.pointAt(this.frac(parseNumber(m)));
        layer.appendChild(svg("path", { class: "awi-marker", d: `M${t.x0} ${y}H${t.x1 + 6}` }));
        layer.appendChild(svgText(formatValue(parseNumber(m), fmt), { class: "awi-tick-label", x: t.x1 + 8, y, "dominant-baseline": "central" }));
      }
    }
  }
  draw() {
    const key = JSON.stringify(["min", "max", "scale", "ticks", "minor_ticks", "format", "orientation", "markers", "fill_color", "show_limits", "lolo", "lo", "hi", "hihi", "size", "segments", "skin", "value_labels"].map((k) => this.get(k)));
    if (key !== this._staticKey || !this.track) {
      this._staticKey = key;
      this.buildStatic();
    }
    const t = this.track;
    const p = this.pos();
    const layer = this.dynamicLayer;
    clear(layer);
    if (this.kind === "vumeter") {
      this.drawSegments(p.fraction);
      return;
    }
    const end = this.pointAt(p.fraction);
    let bar;
    if (this.vertical) {
      const x0 = this.kind === "thermometer" ? t.x0 + 3 : t.x0;
      const x1 = this.kind === "thermometer" ? t.x1 - 3 : t.x1;
      const bottom = this.kind === "thermometer" ? t.y1 + 8 : t.y1;
      bar = svg("rect", { class: "awi-fill", x: x0, y: end, width: x1 - x0, height: Math.max(0, bottom - end), rx: this.kind === "tank" ? 6 : 2 });
    } else {
      bar = svg("rect", { class: "awi-fill", x: t.x0, y: t.y0, width: Math.max(0, end - t.x0), height: t.y1 - t.y0, rx: 3 });
    }
    layer.appendChild(bar);
    if (this.kind === "fillslide" && this.get("mode") === "control") {
      const thumb = this.vertical ? svg("rect", { class: "awi-thumb", x: t.x0 - 4, y: end - 5, width: t.x1 - t.x0 + 8, height: 10, rx: 3 }) : svg("rect", { class: "awi-thumb", x: end - 5, y: t.y0 - 4, width: 10, height: t.y1 - t.y0 + 8, rx: 3 });
      layer.appendChild(thumb);
    }
  }
  drawSegments(fraction2) {
    const t = this.track;
    const n = Math.max(2, Number(this.get("segments")));
    const lit = Math.round(fraction2 * n);
    const g = (k) => this.get(k) === null || this.get(k) === void 0 ? null : this.frac(parseNumber(this.get(k)));
    const warn = g("hi") ?? 0.7;
    const danger = g("hihi") ?? 0.9;
    const peak = this.get("peak");
    const peakIdx = this.get("peak_hold") && peak !== null && peak !== void 0 ? Math.max(0, Math.round(this.frac(parseNumber(peak)) * n) - 1) : -1;
    const span = this.vertical ? t.y1 - t.y0 : t.x1 - t.x0;
    const size = span / n;
    for (let i = 0; i < n; i++) {
      const f = (i + 0.5) / n;
      const zone = f >= danger ? "danger" : f >= warn ? "warn" : "ok";
      const on = i < lit || i === peakIdx;
      const attrs = this.vertical ? { x: t.x0, y: t.y1 - (i + 1) * size + 1, width: t.x1 - t.x0, height: size - 2 } : { x: t.x0 + i * size + 1, y: t.y0, width: size - 2, height: t.y1 - t.y0 };
      this.dynamicLayer.appendChild(svg("rect", { class: `awi-seg awi-seg-${zone}${on ? " awi-on" : ""}${i === peakIdx ? " awi-peak-seg" : ""}`, rx: 1, ...attrs }));
    }
  }
};

// js/src/widgets/rotary.ts
function geometry(kind, view) {
  const range = parseNumber(view.get("angle_range")) || 270;
  switch (kind) {
    case "knob":
      return { vb: [200, 200], cx: 100, cy: 100, range, body: 56, tick: [64, 74], minor: [64, 69], label: 86, needle: 50 };
    case "dial":
      return { vb: [200, 200], cx: 100, cy: 100, range: Number(view.get("turns")) > 1 ? 360 : range, body: 60, tick: [66, 76], minor: [66, 71], label: 87, needle: 56 };
    case "gauge":
      return view.get("variant") === "semicircular" ? { vb: [200, 118], cx: 100, cy: 104, range: 180, face: 96, zone: [70, 80], tick: [70, 82], minor: [74, 82], label: 57, needle: 80 } : { vb: [200, 200], cx: 100, cy: 100, range: 270, face: 96, zone: [70, 80], tick: [70, 82], minor: [74, 82], label: 57, needle: 80 };
    case "meter":
      return { vb: [200, 140], cx: 100, cy: 158, range, zone: [112, 120], tick: [112, 126], minor: [112, 118], label: 100, needle: 128 };
    case "compass":
      return { vb: [200, 200], cx: 100, cy: 100, range: 360, face: 96, tick: [80, 92], minor: [86, 92], label: 66, needle: 74 };
    default:
      throw new Error(`unknown rotary widget ${kind}`);
  }
}
var CARDINALS = { 0: "N", 45: "NE", 90: "E", 135: "SE", 180: "S", 225: "SW", 270: "W", 315: "NW" };
var RotaryView = class extends NumericView {
  constructor(model, el) {
    super(model, el, ["angle_range", "turns", "variant", "ranges", "peak", "peak_hold", "setpoint"]);
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.staticLayer = svg("g");
    this.peakMark = svg("path", { class: "awi-peak" });
    this.spPointer = svg("g", { class: "awi-setpoint" });
    this.needle = svg("g", { class: "awi-needle" });
    this.turnText = svgText("", { class: "awi-turns", "text-anchor": "middle" });
    this.svgEl.append(this.staticLayer, this.peakMark, this.spPointer, this.needle, this.turnText);
    this._staticKey = "";
    this._dragStart = null;
    this.drag(this.svgEl, {
      start: (e) => {
        this._dragStart = { x: e.clientX, y: e.clientY, f: this.pos().fraction ?? 0 };
      },
      move: (e) => this.onDrag(e, false),
      end: (e) => this.onDrag(e, true)
    });
    this.schedule();
  }
  get turns() {
    return Math.max(1, Number(this.get("turns")) || 1);
  }
  onDrag(e, final) {
    const s = this._dragStart;
    if (!s) return;
    const px = e.clientX - s.x - (e.clientY - s.y);
    const sensitivity = e.shiftKey ? 2e3 : 200;
    const turns = this.kind === "dial" ? this.turns : 1;
    const f = Math.min(1, Math.max(0, s.f + px / (sensitivity * turns)));
    this.commitFraction(f, final);
    if (final) this._dragStart = null;
  }
  angleOf(f) {
    const g = this.g;
    if (this.kind === "compass") return f * 360;
    if (this.kind === "dial" && this.turns > 1) return f * this.turns % 1 * 360;
    return -g.range / 2 + f * g.range;
  }
  buildStatic() {
    const g = this.g = geometry(this.kind, this);
    const [w, h] = g.vb;
    this.svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
    const layer = this.staticLayer;
    clear(layer);
    const background = this.skinPart("background", w, h);
    if (background) layer.appendChild(background);
    const housing = this.skinPart("housing", w, h);
    if (housing) layer.appendChild(housing);
    else if (background) {
    } else if (g.face) {
      if (this.kind === "gauge" && this.get("variant") === "semicircular") {
        layer.appendChild(svg("path", { class: "awi-face", d: `${arcPath(g.cx, g.cy, g.face, -90, 90)}Z` }));
      } else {
        layer.appendChild(svg("circle", { class: "awi-face", cx: g.cx, cy: g.cy, r: g.face }));
      }
    } else if (this.kind === "meter") {
      layer.appendChild(svg("rect", { class: "awi-face", x: 2, y: 2, width: w - 4, height: h - 4, rx: 6 }));
    }
    const min = this.min;
    const max = this.max;
    const multiTurn = this.kind === "dial" && this.turns > 1;
    const turnMax = multiTurn ? min + (max - min) / this.turns : max;
    const angle = (v) => {
      if (this.kind === "compass") return v;
      const f = multiTurn ? (v - min) / (turnMax - min) : this.frac(v);
      return multiTurn ? f * 360 : -g.range / 2 + f * g.range;
    };
    const zoneR = g.zone || [g.tick[0], g.tick[0] + 6];
    for (const r of this.get("ranges") || []) {
      const a0 = angle(Math.max(min, parseNumber(r.from)));
      const a1 = angle(Math.min(max, parseNumber(r.to)));
      if (a1 > a0) {
        const p = svg("path", { class: "awi-range", d: sectorPath(g.cx, g.cy, zoneR[0], zoneR[1], a0, a1) });
        const c = safeColor(r.color);
        if (c) p.style.fill = c;
        layer.appendChild(p);
      }
    }
    if (this.get("show_limits") && this.kind !== "compass") {
      for (const z of this.limitZones()) {
        const a0 = -g.range / 2 + z.from * g.range;
        const a1 = -g.range / 2 + z.to * g.range;
        layer.appendChild(svg("path", { class: `awi-zone awi-zone-${z.level}`, d: sectorPath(g.cx, g.cy, zoneR[0], zoneR[1], a0, a1) }));
      }
    }
    if (this.kind !== "compass" && !multiTurn) {
      layer.appendChild(svg("path", { class: "awi-scale-line", d: arcPath(g.cx, g.cy, g.tick[0], -g.range / 2, g.range / 2) }));
    }
    const named = this.valueLabels.filter((l) => l.value >= min && l.value <= turnMax);
    const t = named.length ? { major: named.map((l) => l.value), minor: [] } : ticks(min, turnMax, Number(this.get("ticks")), Number(this.get("minor_ticks")), this.scaleType, { nice: this.kind !== "compass" });
    const tickPath = (vals, [r0, r1]) => vals.map((v) => {
      const a = angle(v);
      const [x0, y0] = polar(g.cx, g.cy, r0, a);
      const [x1, y1] = polar(g.cx, g.cy, r1, a);
      return `M${x0.toFixed(2)} ${y0.toFixed(2)}L${x1.toFixed(2)} ${y1.toFixed(2)}`;
    }).join("");
    layer.appendChild(svg("path", { class: "awi-tick-minor", d: tickPath(t.minor, g.minor) }));
    layer.appendChild(svg("path", { class: "awi-tick-major", d: tickPath(t.major, g.tick) }));
    const fmt = this.get("format");
    const seen = /* @__PURE__ */ new Set();
    for (const v of t.major) {
      const a = angle(v);
      const key = Math.round((a % 360 + 360) % 360 * 10);
      if (seen.has(key)) continue;
      seen.add(key);
      const [x, y] = polar(g.cx, g.cy, g.label, a);
      const name = named.find((l) => l.value === v)?.label;
      const text = name ?? (this.kind === "compass" && CARDINALS[Math.round(v) % 360] ? CARDINALS[Math.round(v) % 360] : formatValue(v, tickFormat(fmt)));
      layer.appendChild(svgText(text, { class: "awi-tick-label", x: x.toFixed(1), y: y.toFixed(1), "text-anchor": "middle", "dominant-baseline": "central" }));
    }
    clear(this.needle);
    if (this.kind === "knob" || this.kind === "dial") {
      const body = g.body;
      const knob = this.skinPart("knob", 2 * body, 2 * body, g.cx - body, g.cy - body);
      if (knob) this.needle.appendChild(knob);
      else {
        this.needle.appendChild(svg("circle", { class: this.kind === "dial" ? "awi-knob-body awi-knurl" : "awi-knob-body", cx: g.cx, cy: g.cy, r: body }));
        this.needle.appendChild(svg("line", { class: "awi-pointer", x1: g.cx, y1: g.cy - body * 0.35, x2: g.cx, y2: g.cy - g.needle, "stroke-linecap": "round" }));
      }
    } else {
      const base = this.kind === "meter" ? 2.5 : 4;
      const needle = this.skinPart("needle", g.needle * 0.3, g.needle, g.cx - g.needle * 0.15, g.cy - g.needle, "xMidYMax meet");
      if (needle) this.needle.appendChild(needle);
      else this.needle.appendChild(svg("path", { class: "awi-needle-shape", d: `M${g.cx - base} ${g.cy}L${g.cx} ${g.cy - g.needle}L${g.cx + base} ${g.cy}Z` }));
      this.needle.appendChild(svg("circle", { class: "awi-hub", cx: g.cx, cy: g.cy, r: this.kind === "meter" ? 6 : 7 }));
    }
    this.needle.style.transformOrigin = `${g.cx}px ${g.cy}px`;
    this.turnText.setAttribute("x", String(g.cx));
    this.turnText.setAttribute("y", String(g.cy + (g.body || 30) + 30));
  }
  draw() {
    const key = JSON.stringify([
      "min",
      "max",
      "scale",
      "ticks",
      "minor_ticks",
      "format",
      "angle_range",
      "turns",
      "variant",
      "ranges",
      "show_limits",
      "lolo",
      "lo",
      "hi",
      "hihi",
      "size",
      "skin",
      "value_labels"
    ].map((k) => this.get(k)));
    if (key !== this._staticKey || !this.g) {
      this._staticKey = key;
      this.buildStatic();
    }
    const g = this.g;
    const p = this.pos();
    this.needle.style.transform = `rotate(${this.angleOf(p.fraction).toFixed(2)}deg)`;
    const turns = this.turns;
    this.turnText.textContent = this.kind === "dial" && turns > 1 ? `turn ${Math.min(turns, Math.floor(p.fraction * turns) + 1)}/${turns}` : "";
    const peak = this.get("peak");
    if (this.get("peak_hold") && peak !== null && peak !== void 0 && g.tick) {
      const a = this.angleOf(this.frac(parseNumber(peak)));
      const [x0, y0] = polar(g.cx, g.cy, g.tick[1] + 1, a - 3);
      const [x1, y1] = polar(g.cx, g.cy, g.tick[1] + 1, a + 3);
      const [x2, y2] = polar(g.cx, g.cy, g.tick[0] + 2, a);
      this.peakMark.setAttribute("d", `M${x0} ${y0}L${x1} ${y1}L${x2} ${y2}Z`);
      this.peakMark.style.display = "";
    } else {
      this.peakMark.style.display = "none";
    }
    const sp = this.get("setpoint");
    clear(this.spPointer);
    if (sp !== null && sp !== void 0 && Number.isFinite(sp) && g.tick) {
      const a = this.angleOf(Math.min(1, Math.max(0, this.frac(sp))));
      const [x1, y1] = polar(g.cx, g.cy, g.needle * 0.92, a);
      this.spPointer.appendChild(svg("line", { class: "awi-sp-line", x1: g.cx, y1: g.cy, x2: x1, y2: y1 }));
      const [m0x, m0y] = polar(g.cx, g.cy, g.tick[1] + 9, a - 4);
      const [m1x, m1y] = polar(g.cx, g.cy, g.tick[1] + 9, a + 4);
      const [m2x, m2y] = polar(g.cx, g.cy, g.tick[1] + 1, a);
      this.spPointer.appendChild(svg("path", { class: "awi-sp-mark", d: `M${m0x} ${m0y}L${m1x} ${m1y}L${m2x} ${m2y}Z` }));
    }
  }
};

// js/src/widgets/sevensegment.ts
var GLYPHS = {
  0: "abcdef",
  1: "bc",
  2: "abdeg",
  3: "abcdg",
  4: "bcfg",
  5: "acdfg",
  6: "acdefg",
  7: "abc",
  8: "abcdefg",
  9: "abcdfg",
  "-": "g",
  " ": "",
  E: "adefg",
  r: "eg",
  o: "cdeg",
  N: "abcef",
  a: "abcdeg",
  n: "ceg",
  I: "bc",
  F: "aefg"
};
var W = 30;
var H = 54;
var T = 5;
function segmentPath(s, ox) {
  const h = T / 2;
  const hor = (x, y) => `M${ox + x + h} ${y}l${h} ${-h}h${W - 4 * h - T}l${h} ${h}l${-h} ${h}h${-(W - 4 * h - T)}Z`;
  const ver = (x, y) => `M${ox + x} ${y + h}l${h} ${h}v${H / 2 - 2 * T}l${-h} ${h}l${-h} ${-h}v${-(H / 2 - 2 * T)}Z`;
  switch (s) {
    case "a":
      return hor(h, h);
    case "g":
      return hor(h, H / 2);
    case "d":
      return hor(h, H - h);
    case "f":
      return ver(h, h);
    case "b":
      return ver(W - h, h);
    case "e":
      return ver(h, H / 2);
    case "c":
      return ver(W - h, H / 2);
    default:
      return "";
  }
}
function sevenSegmentText(v, digits, decimals) {
  if (!Number.isFinite(v)) return { chars: Number.isNaN(v) ? " NaN".slice(-digits) : "  Err".slice(-digits), dp: -1 };
  const text = Math.abs(v).toFixed(Math.max(0, decimals));
  const [int, frac = ""] = text.split(".");
  const body = (v < 0 && Number(text) !== 0 ? "-" : "") + int + frac;
  if (body.length > digits) return { chars: "Err".padStart(digits, " ").slice(-digits), dp: -1 };
  return { chars: body.padStart(digits, " "), dp: frac ? digits - frac.length - 1 : -1 };
}
var SevenSegmentView = class extends NumericView {
  constructor(model, el) {
    super(model, el, ["digits", "decimals", "color"], { role: "img" });
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true", preserveAspectRatio: "xMidYMid meet" });
    this.body.appendChild(this.svgEl);
    this.valueRow.classList.add("awi-sr-only-when-segments");
    let y0 = 0;
    let v0 = 0;
    this.drag(this.svgEl, {
      start: (e) => {
        y0 = e.clientY;
        v0 = Number.isFinite(this.value) ? this.value : this.min;
      },
      move: (e) => this.commit(v0 + Math.round((y0 - e.clientY) / 8) * keyStep(this.min, this.max, this.step)),
      end: (e) => this.commit(v0 + Math.round((y0 - e.clientY) / 8) * keyStep(this.min, this.max, this.step), true)
    });
    this.schedule();
  }
  draw() {
    const digits = Math.max(1, this.get("digits"));
    const gap = 10;
    const width = digits * (W + gap) + gap;
    this.svgEl.setAttribute("viewBox", `0 0 ${width} ${H + 16}`);
    const c = safeColor(this.get("color"));
    if (c) this.root.style.setProperty("--awi-seg-on", c);
    else this.root.style.removeProperty("--awi-seg-on");
    clear(this.svgEl);
    this.svgEl.appendChild(svg("rect", { class: "awi-seg-bg", x: 0, y: 0, width, height: H + 16, rx: 6 }));
    const { chars, dp } = sevenSegmentText(this.value, digits, this.get("decimals"));
    for (let i = 0; i < digits; i++) {
      const ox = gap + i * (W + gap);
      const lit = GLYPHS[chars[i]] ?? "";
      const g = svg("g", { transform: `translate(0 8) skewX(-6)` });
      for (const s of "abcdefg") {
        g.appendChild(svg("path", { class: lit.includes(s) ? "awi-segment awi-on" : "awi-segment", d: segmentPath(s, ox) }));
      }
      g.appendChild(svg("circle", { class: i === dp ? "awi-segment awi-on" : "awi-segment", cx: ox + W + gap / 2, cy: H - 2, r: 3 }));
      this.svgEl.appendChild(g);
    }
  }
};

// js/src/widgets/smlayout.ts
var inX = (b, x, pad5 = 0) => Math.abs(x - b.cx) <= b.w / 2 - pad5;
var inY = (b, y, pad5 = 0) => Math.abs(y - b.cy) <= b.h / 2 - pad5;
function portal(b, p) {
  if (inX(b, p[0], 2)) return [p[0], p[1] < b.cy ? b.cy - b.h / 2 : b.cy + b.h / 2];
  if (inY(b, p[1], 2)) return [p[0] < b.cx ? b.cx - b.w / 2 : b.cx + b.w / 2, p[1]];
  return Math.abs(p[0] - b.cx) / b.w > Math.abs(p[1] - b.cy) / b.h ? [p[0] < b.cx ? b.cx - b.w / 2 : b.cx + b.w / 2, b.cy] : [b.cx, p[1] < b.cy ? b.cy - b.h / 2 : b.cy + b.h / 2];
}
function crosses(p, q, b) {
  const [x0, x1] = [Math.min(p[0], q[0]), Math.max(p[0], q[0])];
  const [y0, y1] = [Math.min(p[1], q[1]), Math.max(p[1], q[1])];
  return x1 > b.cx - b.w / 2 + 1 && x0 < b.cx + b.w / 2 - 1 && y1 > b.cy - b.h / 2 + 1 && y0 < b.cy + b.h / 2 - 1;
}
function overlap(p, q, r, t) {
  const h1 = p[1] === q[1];
  const h2 = r[1] === t[1];
  if (h1 !== h2) return 0;
  const [i, j] = h1 ? [1, 0] : [0, 1];
  if (Math.abs(p[i] - r[i]) >= 4) return 0;
  const lo = Math.max(Math.min(p[j], q[j]), Math.min(r[j], t[j]));
  const hi = Math.min(Math.max(p[j], q[j]), Math.max(r[j], t[j]));
  return Math.max(0, hi - lo);
}
function cuts(p, q, r, t) {
  const h1 = p[1] === q[1];
  if (h1 === (r[1] === t[1])) return false;
  const [hp, hq, vr, vt] = h1 ? [p, q, r, t] : [r, t, p, q];
  const x = vr[0];
  const y = hp[1];
  return x > Math.min(hp[0], hq[0]) && x < Math.max(hp[0], hq[0]) && y > Math.min(vr[1], vt[1]) && y < Math.max(vr[1], vt[1]);
}
function pathCost(points, a, b, ctx) {
  let cost = 0;
  for (let i = 0; i + 1 < points.length; i++) {
    const [p, q] = [points[i], points[i + 1]];
    if (p[0] !== q[0] && p[1] !== q[1]) cost += 5e3;
    for (const box of ctx.boxes) {
      if (box === a && i === 0 || box === b && i === points.length - 2) continue;
      if (crosses(p, q, box)) cost += 1e3;
    }
    for (const [r, t] of ctx.used) {
      cost += 8 * overlap(p, q, r, t);
      if (cuts(p, q, r, t)) cost += 12;
    }
    cost += Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]);
  }
  return cost + 25 * (points.length - 2);
}
var side = (b, horizontal, towards, offset) => horizontal ? [towards < b.cx ? b.cx - b.w / 2 : b.cx + b.w / 2, b.cy + offset] : [b.cx + offset, towards < b.cy ? b.cy - b.h / 2 : b.cy + b.h / 2];
function routePoints(a, b, waypoints, ctx = []) {
  if (waypoints && waypoints.length) {
    return [portal(a, waypoints[0]), ...waypoints, portal(b, waypoints[waypoints.length - 1])];
  }
  const c = Array.isArray(ctx) ? { boxes: ctx, used: [], rowGaps: [], colGaps: [] } : ctx;
  const candidates = [];
  const offsX = [0, -a.w / 4, a.w / 4, -a.w / 8, a.w / 8];
  const offsY = [0, -a.h / 4, a.h / 4];
  const oy0 = Math.max(a.cy - a.h / 2, b.cy - b.h / 2);
  const oy1 = Math.min(a.cy + a.h / 2, b.cy + b.h / 2);
  if (oy1 - oy0 > 4) {
    for (const o of offsY) {
      const y = (oy0 + oy1) / 2 + o;
      if (y > oy0 + 2 && y < oy1 - 2) candidates.push([side(a, true, b.cx, y - a.cy), side(b, true, a.cx, y - b.cy)]);
    }
  }
  const ox0 = Math.max(a.cx - a.w / 2, b.cx - b.w / 2);
  const ox1 = Math.min(a.cx + a.w / 2, b.cx + b.w / 2);
  if (ox1 - ox0 > 4) {
    for (const o of offsX) {
      const x = (ox0 + ox1) / 2 + o;
      if (x > ox0 + 2 && x < ox1 - 2) candidates.push([side(a, false, b.cy, x - a.cx), side(b, false, a.cy, x - b.cx)]);
    }
  }
  for (const o of offsY) {
    for (const ob of offsX) {
      const p0 = side(a, true, b.cx, o);
      const p2 = side(b, false, a.cy, ob);
      candidates.push([p0, [p2[0], p0[1]], p2]);
    }
  }
  for (const oa of offsX) {
    for (const o of offsY) {
      const p0 = side(a, false, b.cy, oa);
      const p2 = side(b, true, a.cx, o);
      candidates.push([p0, [p0[0], p2[1]], p2]);
    }
  }
  for (const g of c.rowGaps) {
    for (const d of [-5, 0, 5]) {
      const y = g + d;
      for (const oa of offsX) {
        for (const ob of offsX) {
          const p0 = side(a, false, y, oa);
          const p3 = side(b, false, y, ob);
          if ((y - a.cy) * (p0[1] - a.cy) <= 0 || (y - b.cy) * (p3[1] - b.cy) <= 0) continue;
          candidates.push([p0, [p0[0], y], [p3[0], y], p3]);
        }
      }
    }
  }
  for (const g of c.colGaps) {
    for (const d of [-5, 0, 5]) {
      const x = g + d;
      for (const oa of offsY) {
        for (const ob of offsY) {
          const p0 = side(a, true, x, oa);
          const p3 = side(b, true, x, ob);
          if ((x - a.cx) * (p0[0] - a.cx) <= 0 || (x - b.cx) * (p3[0] - b.cx) <= 0) continue;
          candidates.push([p0, [x, p0[1]], [x, p3[1]], p3]);
        }
      }
    }
  }
  let best = candidates[0];
  let bestCost = Infinity;
  for (const pts of candidates) {
    const clean = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
    const cost = pathCost(clean, a, b, c);
    if (cost < bestCost) [best, bestCost] = [clean, cost];
  }
  return best;
}
function labelAnchor(points) {
  let best = 0;
  let len = -1;
  for (let i = 0; i + 1 < points.length; i++) {
    const l = Math.abs(points[i + 1][0] - points[i][0]) + Math.abs(points[i + 1][1] - points[i][1]);
    if (l > len) [best, len] = [i, l];
  }
  const [p, q] = [points[best], points[best + 1]];
  return { x: (p[0] + q[0]) / 2, y: (p[1] + q[1]) / 2, horizontal: Math.abs(q[0] - p[0]) >= Math.abs(q[1] - p[1]) };
}
function labelRect(spot, width) {
  const side2 = spot.side ?? 1;
  if (spot.horizontal) return side2 > 0 ? [spot.x - width / 2, spot.y - 12, spot.x + width / 2, spot.y - 1] : [spot.x - width / 2, spot.y + 1, spot.x + width / 2, spot.y + 12];
  return side2 > 0 ? [spot.x + 3, spot.y - 6, spot.x + 4 + width, spot.y + 6] : [spot.x - 4 - width, spot.y - 6, spot.x - 3, spot.y + 6];
}
function placeLabel(points, width, boxes, taken) {
  const segs = points.slice(1).map((q, i) => [points[i], q]);
  segs.sort((s, t) => Math.abs(t[1][0] - t[0][0]) + Math.abs(t[1][1] - t[0][1]) - (Math.abs(s[1][0] - s[0][0]) + Math.abs(s[1][1] - s[0][1])));
  const boxRects = boxes.map((b) => [b.cx - b.w / 2, b.cy - b.h / 2, b.cx + b.w / 2, b.cy + b.h / 2]);
  const area = (r, t) => Math.max(0, Math.min(r[2], t[2]) - Math.max(r[0], t[0])) * Math.max(0, Math.min(r[3], t[3]) - Math.max(r[1], t[1]));
  let best = null;
  let bestCost = Infinity;
  for (const side2 of [1, -1]) {
    for (const [p, q] of segs) {
      for (const f of [0.5, 0.3, 0.7, 0.15, 0.85]) {
        const spot2 = { x: p[0] + (q[0] - p[0]) * f, y: p[1] + (q[1] - p[1]) * f, horizontal: p[1] === q[1], side: side2 };
        const r = labelRect(spot2, width);
        const cost = taken.reduce((c, t) => c + 10 * area(r, t), 0) + boxRects.reduce((c, t) => c + area(r, t), 0);
        if (cost < bestCost - 1e-9) [best, bestCost] = [spot2, cost];
        if (cost === 0) break;
      }
      if (bestCost === 0) break;
    }
    if (bestCost === 0) break;
  }
  if (best) {
    taken.push(labelRect(best, width));
    return best;
  }
  const spot = labelAnchor(points);
  taken.push(labelRect(spot, width));
  return spot;
}
function inZone(rects, x, y) {
  return rects.some(([x0, y0, x1, y1]) => x > x0 && x < x1 && y > y0 && y < y1);
}
function zoneOutline(rects) {
  const xs = [...new Set(rects.flatMap((r) => [r[0], r[2]]))].sort((a, b) => a - b);
  const ys = [...new Set(rects.flatMap((r) => [r[1], r[3]]))].sort((a, b) => a - b);
  const cov = (i, j) => i >= 0 && j >= 0 && i < xs.length - 1 && j < ys.length - 1 && inZone(rects, (xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2);
  const segs = [];
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < ys.length - 1; j++) {
      if (!cov(i, j)) continue;
      if (!cov(i, j - 1)) segs.push([xs[i], ys[j], xs[i + 1], ys[j]]);
      if (!cov(i, j + 1)) segs.push([xs[i], ys[j + 1], xs[i + 1], ys[j + 1]]);
      if (!cov(i - 1, j)) segs.push([xs[i], ys[j], xs[i], ys[j + 1]]);
      if (!cov(i + 1, j)) segs.push([xs[i + 1], ys[j], xs[i + 1], ys[j + 1]]);
    }
  }
  const merged = [];
  const key = (s) => s[1] === s[3] ? `h${s[1]}` : `v${s[0]}`;
  const byLine = /* @__PURE__ */ new Map();
  for (const s of segs) byLine.set(key(s), [...byLine.get(key(s)) || [], s]);
  for (const [k, list] of byLine) {
    const horizontal = k.startsWith("h");
    list.sort((p, q) => horizontal ? p[0] - q[0] : p[1] - q[1]);
    let cur = [...list[0]];
    for (const s of list.slice(1)) {
      if (horizontal ? s[0] === cur[2] : s[1] === cur[3]) cur = horizontal ? [cur[0], cur[1], s[2], cur[3]] : [cur[0], cur[1], cur[2], s[3]];
      else {
        merged.push(cur);
        cur = [...s];
      }
    }
    merged.push(cur);
  }
  return merged;
}
function insetOutline(rects, cw, ch, inset) {
  const e = 1e-3;
  const inside = (x, y) => inZone(rects, x, y);
  return zoneOutline(rects).map(([x0, y0, x1, y1]) => {
    if (y0 === y1) {
      const down = inside((x0 + x1) / 2, y0 + e) ? 1 : -1;
      const a2 = inside(x0 - e, y0 + down * e) ? -inset : inset;
      const b2 = inside(x1 + e, y0 + down * e) ? inset : -inset;
      const y = y0 * ch + down * inset;
      return [x0 * cw + a2, y, x1 * cw + b2, y];
    }
    const right = inside(x0 + e, (y0 + y1) / 2) ? 1 : -1;
    const a = inside(x0 + right * e, y0 - e) ? -inset : inset;
    const b = inside(x0 + right * e, y1 + e) ? inset : -inset;
    const x = x0 * cw + right * inset;
    return [x, y0 * ch + a, x, y1 * ch + b];
  });
}
function zoneExit(rects, x, y, reach = 6) {
  const step = 0.01;
  let best = null;
  let bestD = Infinity;
  for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
    for (let d = step; d <= reach && d < bestD; d += step) {
      if (inZone(rects, x + dx * d, y + dy * d)) {
        bestD = d;
        best = [x + dx * (d - step), y + dy * (d - step)];
        break;
      }
    }
  }
  return best;
}

// js/src/widgets/statemachine.ts
var SC2 = "SC";
function wrapTitle(title, width, lines = 2) {
  const out = [];
  let line = "";
  for (const word of title.split(/\s+/).filter(Boolean)) {
    if (line && line.length + 1 + word.length > width) {
      out.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) out.push(line);
  if (out.length <= lines) return out;
  const kept = out.slice(0, lines);
  kept[lines - 1] = `${kept[lines - 1].slice(0, Math.max(1, width - 1))}…`;
  return kept;
}
var StateMachineView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "machine", "available_commands", "last_command"]);
    this.svgEl = svg("svg", { class: "awi-svg awi-sm-diagram", "aria-hidden": "true" });
    this.statusEl = html("div", { cls: "awi-sm-status", attrs: { role: "status" } });
    this.bar = html("div", { cls: "awi-sm-commands", attrs: { role: "group", "aria-label": "Commands" } });
    this.body.append(this.svgEl, this.statusEl, this.bar);
    this.body.setAttribute("role", "group");
    this.listen("msg:custom", (msg) => {
      if (msg && msg.type === "rejected") this.reject(String(msg.command), String(msg.state));
    });
    this.schedule();
  }
  get machine() {
    return this.contract ? machineOf(this.model, this.contract) : this.get("machine");
  }
  reject(command, state) {
    this.statusEl.textContent = `✖ ${command} not allowed in ${state}`;
  }
  /**
   * Operator command (IND-061): always sent to the host; applied by the front
   * end when no host owns the state (HOST-004).
   */
  command(c) {
    if (!this.interactive) return;
    this.model.send({ type: "command", command: c });
    const model = this.model;
    if (hostOwnsState(model)) return;
    const state = String(this.get("value"));
    const next = nextState(this.machine, state, c);
    if (next === null) return this.reject(c, state);
    model.set("last_command", c);
    model.set("value", next);
    model.save_changes();
  }
  /** Command buttons (IND-061), enabled when valid in the current state. */
  renderCommands(m, available) {
    clear(this.bar);
    const control = this.get("mode") === "control";
    for (const c of m.commands || []) {
      const ok = available.has(c);
      const btn = html("button", { cls: "awi-sm-cmd", text: c, attrs: { type: "button", "aria-disabled": String(!ok) } });
      btn.disabled = !control || !ok || !!this.get("disabled");
      btn.addEventListener("click", () => ok && this.command(c));
      this.bar.appendChild(btn);
    }
    this.bar.hidden = !control;
  }
  draw() {
    const m = this.machine;
    const current = String(this.get("value"));
    const available = new Set(this.get("available_commands") || []);
    const [w, h] = this.get("size");
    this.renderCommands(m, available);
    const barH = this.bar.hidden ? 0 : Math.max(24, this.bar.offsetHeight + 4);
    const dh = Math.max(80, h - 38 - barH);
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${dh}`);
    s.style.height = `${dh}px`;
    clear(s);
    const cols = Math.max(1, ...m.states.map((st) => st.x + 1));
    const rows = Math.max(1, ...m.states.map((st) => st.y + 1));
    const cw = w / cols;
    const ch = dh / rows;
    const titled = m.states.some((st) => st.title);
    const bw = Math.max(20, Math.min(cw - 40, titled ? 130 : 112));
    const bh = Math.max(14, Math.min(ch - 24, titled ? 44 : 30));
    const px = (p) => [p[0] * cw, p[1] * ch];
    const boxes = {};
    for (const st of m.states) boxes[st.name] = { cx: cw * (st.x + 0.5), cy: ch * (st.y + 0.5), w: bw, h: bh };
    const edges = svg("g", { class: "awi-sm-edges" });
    const labels = svg("g", { class: "awi-sm-edge-labels" });
    const arrow = `url(#${this.id}-arrow)`;
    const all = Object.values(boxes);
    const used = [];
    const taken = [];
    const zoneLabels = svg("g", { class: "awi-sm-zone-labels" });
    const zoneLabel = (text, x, y) => {
      zoneLabels.appendChild(svgText(text, { class: "awi-sm-zone-label", x, y, "dominant-baseline": "hanging" }));
      taken.push([x - 2, y - 1, x + text.length * 5.8 + 2, y + 11]);
    };
    const edge = (points, text, next, extra = "") => {
      const d = points.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("");
      edges.appendChild(svg("path", { class: `awi-sm-edge${extra}${next ? " awi-sm-edge-next" : ""}`, d, "marker-end": arrow }));
      for (let i = 0; i + 1 < points.length; i++) used.push([points[i], points[i + 1]]);
      const a = placeLabel(points, text.length * 5.2 + 4, all, taken);
      const above = (a.side ?? 1) > 0;
      const attrs = a.horizontal ? { x: a.x, y: above ? a.y - 3 : a.y + 3, "text-anchor": "middle", "dominant-baseline": above ? "auto" : "hanging" } : { x: above ? a.x + 4 : a.x - 4, y: a.y, "text-anchor": above ? "start" : "end", "dominant-baseline": "central" };
      labels.appendChild(svgText(text, { class: `awi-sm-edge-label${next ? " awi-sm-edge-label-next" : ""}`, ...attrs }));
    };
    const groups = [...new Set(m.states.map((st) => st.group).filter((g) => !!g))];
    for (const st of m.states) {
      if (!st.group) continue;
      s.appendChild(svg("rect", { class: `awi-sm-zone awi-sm-zone-${groups.indexOf(st.group) % 3}`, x: cw * st.x, y: ch * st.y, width: cw, height: ch }));
    }
    for (const g of groups) {
      const first = m.states.filter((st) => st.group === g).sort((a, b) => a.y - b.y || a.x - b.x)[0];
      zoneLabel(g, cw * first.x + 3, ch * first.y + 2);
    }
    const zoneCmds = /* @__PURE__ */ new Set();
    (m.zones || []).forEach((z, i) => {
      const inset = 3 + 5 * i;
      const inside = m.states.filter((st) => inZone(z.rects, st.x + 0.5, st.y + 0.5));
      if (z.shade) {
        for (const [x0, y0, x1, y1] of z.rects) s.appendChild(svg("rect", { class: "awi-sm-area-shade", x: x0 * cw, y: y0 * ch, width: (x1 - x0) * cw, height: (y1 - y0) * ch }));
      }
      const d = insetOutline(z.rects, cw, ch, inset).map(([x0, y0, x1, y1]) => `M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`).join("");
      s.appendChild(svg("path", { class: "awi-sm-area", d }));
      if (z.label) zoneLabel(z.label, z.rects[0][0] * cw + inset + 3, z.rects[0][1] * ch + inset + 2);
      for (const c of z.commands || []) {
        const targets = new Set(inside.map((st) => nextState(m, st.name, c)));
        const [to] = targets;
        if (!inside.length || targets.size !== 1 || !to || !boxes[to]) continue;
        const target = m.states.find((st) => st.name === to);
        const exit = zoneExit(z.rects, target.x + 0.5, target.y + 0.5);
        if (!exit) continue;
        const b = boxes[to];
        const [ex, ey] = px(exit);
        const vertical = Math.abs(ex - b.cx) < 0.5;
        const start = vertical ? [ex, ey + (ey < b.cy ? -inset : inset)] : [ex + (ex < b.cx ? -inset : inset), ey];
        const end = vertical ? [b.cx, b.cy + (ey < b.cy ? -bh / 2 : bh / 2)] : [b.cx + (ex < b.cx ? -bw / 2 : bw / 2), b.cy];
        const here2 = inside.some((st) => st.name === current);
        edge([start, end], c, here2 && available.has(c), " awi-sm-zone-edge");
        zoneCmds.add(c);
      }
    });
    const fromAny = new Set(globalCommands(m));
    const pairs = /* @__PURE__ */ new Map();
    for (const [from, cmd, to] of m.transitions || []) {
      if (fromAny.has(cmd) || zoneCmds.has(cmd) || !boxes[from] || !boxes[to] || from === to) continue;
      const key = `${from}>${to}`;
      pairs.set(key, [...pairs.get(key) || [], cmd]);
    }
    const rowGaps = Array.from({ length: rows + 1 }, (_, k) => Math.min(dh - 3, Math.max(3, k * ch)));
    const colGaps = Array.from({ length: cols + 1 }, (_, k) => Math.min(w - 3, Math.max(3, k * cw)));
    const order = [...pairs.keys()].sort((p, q) => {
      const fixed = Number(!m.routes?.[p]) - Number(!m.routes?.[q]);
      const dist = (k) => {
        const [f, t] = k.split(">");
        return Math.abs(boxes[f].cx - boxes[t].cx) + Math.abs(boxes[f].cy - boxes[t].cy);
      };
      return fixed || dist(p) - dist(q);
    });
    for (const key of order) {
      const cmds = pairs.get(key);
      const [from, to] = key.split(">");
      const route = m.routes?.[key]?.map(px) ?? null;
      const points = routePoints(boxes[from], boxes[to], route, { boxes: all, used, rowGaps, colGaps });
      const next = from === current && cmds.some((c) => c === SC2 || available.has(c));
      edge(points, cmds.join(" / "), next);
    }
    s.appendChild(
      svg("defs", {}, [
        svg("marker", { id: `${this.id}-arrow`, viewBox: "0 0 8 8", refX: 7, refY: 4, markerWidth: 7, markerHeight: 7, markerUnits: "userSpaceOnUse", orient: "auto-start-reverse" }, [svg("path", { class: "awi-sm-arrowhead", d: "M0 0L8 4L0 8Z" })])
      ])
    );
    s.append(edges);
    for (const st of m.states) {
      const { cx, cy } = boxes[st.name];
      const cls = `awi-sm-state ${st.acting ? "awi-sm-acting" : "awi-sm-wait"}${st.name === current ? " awi-sm-current" : ""}`;
      s.appendChild(svg("rect", { class: cls, x: cx - bw / 2, y: cy - bh / 2, width: bw, height: bh, rx: st.acting ? Math.min(12, bh / 2) : 2 }));
      const label = st.name === current ? `▶ ${st.name}` : st.name;
      const lines = st.title && bh >= 26 ? wrapTitle(st.title, Math.max(8, Math.floor(bw / 4.8)), bh >= 40 ? 2 : 1) : [];
      const top = cy - lines.length * 10 / 2;
      const kind = st.acting ? "" : " awi-sm-label-wait";
      s.appendChild(svgText(label, { class: `awi-sm-label${kind}${st.name === current ? " awi-sm-label-current" : ""}`, x: cx, y: lines.length ? top : cy, "text-anchor": "middle", "dominant-baseline": "central" }));
      lines.forEach((line, i) => {
        s.appendChild(svgText(line, { class: `awi-sm-title${st.name === current ? " awi-sm-title-current" : ""}`, x: cx, y: top + 10 * (i + 1), "text-anchor": "middle", "dominant-baseline": "central" }));
      });
    }
    s.append(labels, zoneLabels);
    const here = m.states.find((st) => st.name === current);
    const named = here?.title ? `${current} ${here.title}` : current;
    const notes = (m.commands || []).filter((c) => fromAny.has(c) && !zoneCmds.has(c));
    const anyNote = notes.length ? ` · ${notes.join(" / ")}: from most states` : "";
    if (!this.statusEl.textContent.startsWith("✖") || this._shown !== current) {
      this.statusEl.textContent = `State: ${named}${here?.acting ? " (acting, completes by itself)" : ""}${anyNote}`;
    }
    this._shown = current;
    this.body.setAttribute("aria-label", `${this.get("label") || "State machine"}: ${named}; available commands: ${[...available].join(", ") || "none"}`);
  }
};

// js/src/widgets/themeswitch.ts
var THEME_POSITIONS = [
  ["light", "☀ Light"],
  ["system", "◐ System"],
  ["dark", "☾ Dark"]
];
var ThemeSwitchView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "page_theme"]);
    const b = this.body;
    b.setAttribute("role", "radiogroup");
    b.setAttribute("aria-labelledby", this.labelEl.id);
    b.removeAttribute("data-lm-suppress-shortcuts");
    this.buttons = THEME_POSITIONS.map(([value, text]) => {
      const btn = html("button", { cls: "awi-theme-opt", text, attrs: { type: "button", role: "radio", "data-value": value } });
      btn.addEventListener("click", () => this.choose(value));
      return btn;
    });
    b.append(...this.buttons);
    b.addEventListener("keydown", (e) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const k = Math.max(0, THEME_POSITIONS.findIndex(([v]) => v === this.get("value")));
      const next = Math.min(THEME_POSITIONS.length - 1, Math.max(0, k + step));
      this.choose(THEME_POSITIONS[next][0]);
      this.buttons[next].focus();
    });
    this.listen("change:value", () => this.applyPage());
    if (this.get("value") !== "auto") this.applyPage();
    this.schedule();
  }
  applyPage() {
    if (this.get("page_theme") && this.get("value") !== "auto") applyPageTheme(this.el.ownerDocument, this.get("value"));
  }
  choose(value) {
    if (!this.interactive || value === this.get("value")) return;
    this.sendValue(value, true);
    this.applyPage();
    this.schedule();
  }
  draw() {
    const value = this.get("value");
    const on = this.interactive;
    this.buttons.forEach((btn, k) => {
      const checked = THEME_POSITIONS[k][0] === value;
      btn.setAttribute("aria-checked", String(checked));
      btn.classList.toggle("awi-on", checked);
      btn.tabIndex = checked || k === 0 && !THEME_POSITIONS.some(([v]) => v === value) ? 0 : -1;
      btn.disabled = !on;
    });
  }
};

// js/src/widgets/compact.ts
var LEVEL_TEXT = { lolo: "LOLO", lo: "LO", hi: "HI", hihi: "HIHI" };
function signed(v, fmt = "%.2f") {
  const text = formatValue(v, String(fmt).replace("%+", "%"));
  return Number.isFinite(v) && v > 0 && !text.startsWith("+") ? `+${text}` : text;
}
var ValueRing = class {
  constructor(capacity) {
    this.capacity = Math.max(2, capacity | 0);
    this.data = new Float32Array(this.capacity);
    this.total = 0;
  }
  push(values, n) {
    for (let i = Math.max(0, n - this.capacity); i < n; i++) this.data[(this.total + i) % this.capacity] = values[i];
    this.total += n;
  }
  /** Kept values, oldest first. */
  values() {
    const n = Math.min(this.total, this.capacity);
    return Array.from({ length: n }, (_, k) => this.data[(this.total - n + k) % this.capacity]);
  }
};
function attachHistory(view) {
  const reset = () => {
    view.ring = new ValueRing(parseNumber(view.get("history")) || 2);
  };
  reset();
  view.listen("change:history", () => {
    reset();
    view.schedule();
  });
  view.listen("msg:custom", (msg, buffers) => {
    if (!msg || msg.type !== "snapshot" && msg.type !== "append") return;
    if (msg.type === "snapshot") reset();
    view.ring.push(toFloat32(buffers?.[0]), (msg.n ?? 0) | 0);
    view.schedule();
  });
  view.model.send({ type: "sync_request" });
}
function drawSpark(g, values, { x, y, w, h }) {
  const finite = values.map((v, i) => [i, v]).filter(([, v]) => Number.isFinite(v));
  if (finite.length === 0) return null;
  let lo = Infinity;
  let hi = -Infinity;
  let iLo = 0;
  let iHi = 0;
  for (const [i, v] of finite) {
    if (v < lo) {
      lo = v;
      iLo = i;
    }
    if (v > hi) {
      hi = v;
      iHi = i;
    }
  }
  const n = Math.max(values.length - 1, 1);
  const X = (i) => x + i / n * w;
  const Y = (v) => hi === lo ? y + h / 2 : y + h - (v - lo) / (hi - lo) * h;
  let d = "";
  let pen = false;
  values.forEach((v, i) => {
    if (!Number.isFinite(v)) {
      pen = false;
      return;
    }
    d += `${pen ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`;
    pen = true;
  });
  g.appendChild(svg("path", { class: "awi-spark-line", d }));
  g.appendChild(svg("circle", { class: "awi-spark-min", cx: X(iLo), cy: Y(lo), r: 2.5 }));
  g.appendChild(svg("circle", { class: "awi-spark-max", cx: X(iHi), cy: Y(hi), r: 2.5 }));
  return { lo, hi };
}
var DeviationView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "setpoint", "tolerance", "span", "unit", "format"]);
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.body.setAttribute("role", "meter");
    this.body.setAttribute("aria-labelledby", this.labelEl.id);
    this.valueRow = html("div", { cls: "awi-value-row" });
    this.valueText = html("span", { cls: "awi-value" });
    this.badge = html("span", { cls: "awi-badge" });
    this.valueRow.append(this.valueText, this.badge);
    this.root.append(this.valueRow);
    this.schedule();
  }
  get deviation() {
    return parseNumber(this.get("value")) - parseNumber(this.get("setpoint"));
  }
  renderCommon() {
    super.renderCommon();
    const d = this.deviation;
    const tol = Math.max(0, parseNumber(this.get("tolerance")) || 0);
    const span = parseNumber(this.get("span")) || 1;
    const out = Number.isFinite(d) && Math.abs(d) > tol;
    this.root.classList.toggle("awi-dev-out", out);
    const text = `Δ ${withUnit(signed(d, this.get("format") || "%.2f"), this.get("unit"))}`;
    this.valueText.textContent = text;
    const state = out ? d > 0 ? "▲ HIGH" : "▼ LOW" : "";
    this.badge.textContent = state;
    this.badge.hidden = !out;
    const b = this.body;
    b.setAttribute("aria-valuemin", String(-span));
    b.setAttribute("aria-valuemax", String(span));
    if (Number.isFinite(d)) b.setAttribute("aria-valuenow", String(d));
    else b.removeAttribute("aria-valuenow");
    b.setAttribute("aria-valuetext", `deviation ${text.slice(2)}, tolerance ±${formatValue(tol, "%.3g")}${out ? `, ${state.slice(2).toLowerCase()}` : ", within tolerance"}`);
  }
  draw() {
    const [w, h] = this.get("size");
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    clear(s);
    const span = parseNumber(this.get("span")) || 1;
    const tol = Math.max(0, parseNumber(this.get("tolerance")) || 0);
    const x0 = 10;
    const x1 = w - 10;
    const X = (v) => x0 + (clamp(v, -span, span) + span) / (2 * span) * (x1 - x0);
    const [y0, y1] = [4, Math.min(h - 16, 22)];
    s.appendChild(svg("rect", { class: "awi-dev-track", x: x0, y: y0, width: x1 - x0, height: y1 - y0 }));
    s.appendChild(svg("rect", { class: "awi-dev-band", x: X(-tol), y: y0, width: X(tol) - X(-tol), height: y1 - y0 }));
    const d = this.deviation;
    if (Number.isFinite(d)) {
      const [a, b] = [X(0), X(d)].sort((p, q) => p - q);
      s.appendChild(svg("rect", { class: "awi-dev-bar", x: a, y: y0 + 3, width: Math.max(1, b - a), height: y1 - y0 - 6 }));
      if (Math.abs(d) > span) s.appendChild(svgText(d > 0 ? "▶" : "◀", { class: "awi-dev-over", x: d > 0 ? x1 + 5 : x0 - 5, y: (y0 + y1) / 2, "text-anchor": "middle", "dominant-baseline": "central" }));
    }
    s.appendChild(svg("path", { class: "awi-dev-zero", d: `M${X(0)} ${y0 - 2}V${y1 + 2}` }));
    for (const [v, anchor] of [[-span, "start"], [0, "middle"], [span, "end"]]) {
      s.appendChild(svgText(signed(v, "%.3g"), { class: "awi-dev-tick", x: X(v), y: y1 + 10, "text-anchor": anchor }));
    }
  }
};
var SparklineView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "unit", "format"]);
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.body.setAttribute("role", "img");
    attachHistory(this);
    this.schedule();
  }
  draw() {
    const [w, h] = this.get("size");
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    clear(s);
    const fmt = this.get("format") || "%.4g";
    const kept = this.ring.values();
    const newest = kept.length ? kept[kept.length - 1] : parseNumber(this.get("value"));
    const last = withUnit(formatValue(newest, fmt), this.get("unit"));
    const textW = Math.min(w * 0.45, 8 + last.length * 7);
    const box = { x: 3, y: 4, w: w - textW - 8, h: h - 8 };
    const range = drawSpark(s, kept, box);
    s.appendChild(svgText(last, { class: "awi-spark-value", x: w - 2, y: h / 2, "text-anchor": "end", "dominant-baseline": "central" }));
    const extra = range ? `, min ${formatValue(range.lo, fmt)}, max ${formatValue(range.hi, fmt)}` : "";
    this.body.setAttribute("aria-label", `${this.get("label") || "Sparkline"}: last ${last}${extra}`);
  }
};
var BarGraphView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "bars", "min", "max", "unit", "format", "alarm_levels"]);
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.body.setAttribute("role", "img");
    this.schedule();
  }
  draw() {
    const [w, h] = this.get("size");
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    clear(s);
    const bars = normalizeBars(this.get("bars"));
    const values = this.get("value") || [];
    const levels = this.get("alarm_levels") || [];
    const min = parseNumber(this.get("min"));
    const max = parseNumber(this.get("max"));
    const fmt = this.get("format") || "%.1f";
    const left = 30;
    const top = 26;
    const bottom = h - 16;
    const Y = (v) => bottom - (clamp(v, min, max) - min) / (max - min || 1) * (bottom - top);
    for (const v of [min, (min + max) / 2, max]) {
      s.appendChild(svgText(formatValue(v, "%.3g"), { class: "awi-bar-tick", x: left - 4, y: Y(v), "text-anchor": "end", "dominant-baseline": "central" }));
      s.appendChild(svg("path", { class: "awi-bar-grid", d: `M${left} ${Y(v)}H${w - 2}` }));
    }
    const n = Math.max(bars.length, 1);
    const col = (w - left - 2) / n;
    const bw = Math.min(28, col * 0.5);
    const summary = [];
    bars.forEach((bar, i) => {
      const cx = left + col * (i + 0.5);
      const x = cx - bw / 2;
      const v = parseNumber(values[i]);
      const level = levels[i] || "normal";
      s.appendChild(svg("rect", { class: "awi-bar-track", x, y: top, width: bw, height: bottom - top }));
      const nlo = parseNumber(bar.normal_lo);
      const nhi = parseNumber(bar.normal_hi);
      if (Number.isFinite(nlo) || Number.isFinite(nhi)) {
        const ya = Y(Number.isFinite(nhi) ? nhi : max);
        const yb = Y(Number.isFinite(nlo) ? nlo : min);
        s.appendChild(svg("rect", { class: "awi-bar-normal", x, y: ya, width: bw, height: yb - ya }));
      }
      if (Number.isFinite(v)) {
        const y = Y(v);
        s.appendChild(svg("rect", { class: `awi-bar-fill${LEVEL_TEXT[level] ? ` awi-bar-alarm awi-bar-${level}` : ""}`, x: x + bw * 0.2, y, width: bw * 0.6, height: bottom - y }));
      }
      for (const k of ["lolo", "lo", "hi", "hihi"]) {
        const lim = parseNumber(bar[k]);
        if (Number.isFinite(lim)) s.appendChild(svg("path", { class: `awi-bar-limit awi-bar-limit-${k}`, d: `M${x - 3} ${Y(lim)}H${x + bw + 3}` }));
      }
      const valueText = formatValue(v, fmt);
      s.appendChild(svgText(LEVEL_TEXT[level] ? `${valueText} ${LEVEL_TEXT[level]}` : valueText, { class: `awi-bar-value${LEVEL_TEXT[level] ? " awi-bar-value-alarm" : ""}`, x: cx, y: top - 6, "text-anchor": "middle" }));
      s.appendChild(svgText(String(bar.label ?? ""), { class: "awi-bar-label", x: cx, y: h - 3, "text-anchor": "middle" }));
      summary.push(`${bar.label} ${withUnit(valueText, this.get("unit"))}${LEVEL_TEXT[level] ? ` ${LEVEL_TEXT[level]}` : ""}`);
    });
    if (this.get("unit")) s.appendChild(svgText(this.get("unit"), { class: "awi-bar-tick", x: left - 4, y: 8, "text-anchor": "end" }));
    this.body.setAttribute("aria-label", `${this.get("label") || "Bar graph"}: ${summary.join(", ")}`);
  }
};
function kpiDelta(value, target, higherIsBetter, fmt, unit) {
  const t = parseNumber(target);
  if (target === null || target === void 0 || !Number.isFinite(t) || !Number.isFinite(value)) return null;
  const d = value - t;
  const good = higherIsBetter ? d >= 0 : d <= 0;
  const arrow = d > 0 ? "▲" : d < 0 ? "▼" : "=";
  const sign = d > 0 ? "+" : "";
  return { good, text: `${arrow} ${sign}${withUnit(formatValue(d, fmt), unit)} vs target ${withUnit(formatValue(t, fmt), unit)} ${good ? "✓" : "✗"}` };
}
var KPITileView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "target", "higher_is_better", "unit", "format", "show_sparkline"]);
    this.body.setAttribute("role", "img");
    this.valueEl = html("div", { cls: "awi-kpi-value" });
    this.deltaEl = html("div", { cls: "awi-kpi-delta" });
    this.svgEl = svg("svg", { class: "awi-kpi-spark", "aria-hidden": "true" });
    this.body.append(this.valueEl, this.deltaEl, this.svgEl);
    attachHistory(this);
    this.schedule();
  }
  draw() {
    const [w] = this.get("size");
    const v = parseNumber(this.get("value"));
    const fmt = this.get("format") || "%.1f";
    const unit = this.get("unit") || "";
    const valueText = withUnit(formatValue(v, fmt), unit);
    this.valueEl.textContent = valueText;
    const delta = kpiDelta(v, this.get("target"), this.get("higher_is_better") !== false, fmt, unit);
    this.deltaEl.textContent = delta ? delta.text : "";
    this.deltaEl.hidden = !delta;
    this.root.classList.toggle("awi-kpi-good", !!delta?.good);
    this.root.classList.toggle("awi-kpi-bad", !!delta && !delta.good);
    const s = this.svgEl;
    clear(s);
    const show = !!this.get("show_sparkline") && this.ring.total > 1;
    s.style.display = show ? "" : "none";
    if (show) {
      const sw = w - 16;
      s.setAttribute("viewBox", `0 0 ${sw} 22`);
      s.setAttribute("width", String(sw));
      s.setAttribute("height", "22");
      drawSpark(s, this.ring.values(), { x: 3, y: 3, w: sw - 6, h: 16 });
    }
    this.body.setAttribute("aria-label", `${this.get("label") || "KPI"}: ${valueText}${delta ? `, ${delta.text.replace("✓", "on the good side").replace("✗", "on the wrong side")}` : ""}`);
  }
};

// js/src/widgets/eventlog.ts
var CATEGORIES = { all: "All categories", operator: "Operator", state: "State", alarm: "Alarm", system: "System" };
var pad3 = (n) => String(n).padStart(2, "0");
function eventTime(t) {
  const d = new Date(Number(t) * 1e3);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad3(d.getMonth() + 1)}-${pad3(d.getDate())} ${pad3(d.getHours())}:${pad3(d.getMinutes())}:${pad3(d.getSeconds())}`;
}
function filterEvents(events, { category: category2 = "all", text = "" } = {}) {
  const needle = text.trim().toLowerCase();
  return events.filter((e) => (category2 === "all" || e.category === category2) && (!needle || `${e.source} ${e.message}`.toLowerCase().includes(needle))).slice().sort((a, b) => Number(b.time) - Number(a.time) || Number(b.id) - Number(a.id));
}
function eventsCsv(events) {
  const esc = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = [["time", "category", "source", "message"]];
  for (const e of [...events].reverse()) rows.push([new Date(Number(e.time) * 1e3).toISOString(), e.category, e.source, e.message]);
  return rows.map((r) => r.map(esc).join(",")).join("\n");
}
var EventLogView = class extends BaseView {
  constructor(model, el) {
    super(model, el, ["value", "max_events"]);
    this.shown = [];
    this.filters = { category: "all", text: "" };
    const b = this.body;
    b.setAttribute("role", "region");
    this.catSel = html("select", { attrs: { "aria-label": "Category", "data-lm-suppress-shortcuts": "true" } }, Object.entries(CATEGORIES).map(([v, t]) => html("option", { text: t, attrs: { value: v } })));
    this.catSel.addEventListener("change", () => {
      this.filters.category = this.catSel.value;
      this.schedule();
    });
    this.search = html("input", { cls: "awi-al-search", attrs: { type: "search", placeholder: "Filter…", "aria-label": "Filter text", "data-lm-suppress-shortcuts": "true" } });
    this.search.addEventListener("input", () => {
      this.filters.text = this.search.value;
      this.schedule();
    });
    const csv = html("button", { cls: "awi-al-sort", text: "CSV", attrs: { type: "button", title: "Download the shown events as CSV", "aria-label": "Download the shown events as CSV" } });
    csv.addEventListener("click", () => download(new Blob([eventsCsv(this.shown || [])], { type: "text/csv" }), `${this.get("label") || "events"}.csv`));
    this.counts = html("div", { cls: "awi-al-counts", attrs: { role: "status" } });
    this.table = html("table", { cls: "awi-banner-table awi-ev-table" });
    const head = html("tr", {}, ["Time", "Category", "Source", "Message"].map((t) => html("th", { text: t, attrs: { scope: "col" } })));
    this.tbody = html("tbody");
    this.table.append(html("thead", {}, [head]), this.tbody);
    b.append(html("div", { cls: "awi-al-tools" }, [this.catSel, this.search, csv]), this.counts, html("div", { cls: "awi-banner-scroll" }, [this.table]));
    this.schedule();
  }
  draw() {
    const events = (this.get("value") || []).slice(-(Number(this.get("max_events")) || 1));
    const shown = this.shown = filterEvents(events, this.filters);
    this.counts.textContent = `${shown.length} of ${events.length} events`;
    clear(this.tbody);
    for (const e of shown) {
      const cat = e.category && CATEGORIES[e.category] ? e.category : "system";
      const chip = html("span", { cls: `awi-ev-cat awi-ev-${cat}`, text: CATEGORIES[cat].toUpperCase() });
      this.tbody.appendChild(html("tr", { cls: `awi-ev-row-${cat}` }, [html("td", { text: eventTime(e.time) }), html("td", {}, [chip]), html("td", { text: e.source || "" }), html("td", { text: e.message || "" })]));
    }
    const latest = events.length ? events[events.length - 1] : null;
    this.body.setAttribute("aria-label", `${this.get("label") || "Event log"}: ${events.length} events${latest ? `, latest ${latest.message ?? ""}` : ""}`);
  }
};

// js/src/widgets/keypad.ts
var TRAITS9 = ["value", "min", "max", "unit", "format", "confirm_delta", "coerce"];
var KEYS = [
  ["7", "7", "7"],
  ["8", "8", "8"],
  ["9", "9", "9"],
  ["⌫", "back", "Backspace"],
  ["4", "4", "4"],
  ["5", "5", "5"],
  ["6", "6", "6"],
  ["C", "clear", "Clear the entry"],
  ["1", "1", "1"],
  ["2", "2", "2"],
  ["3", "3", "3"],
  ["±", "sign", "Change the sign"],
  ["0", "0", "0"],
  [".", ".", "Decimal point"],
  ["Esc", "cancel", "Cancel"],
  ["↵", "enter", "Enter"],
  // hexadecimal digits, shown only for a hexadecimal format (IND-110)
  ["A", "A", "A"],
  ["B", "B", "B"],
  ["C", "hexC", "C"],
  ["D", "D", "D"],
  ["E", "E", "E"],
  ["F", "F", "F"]
];
var DIGIT = /^[0-9A-F]$/;
function digitOf(action) {
  if (action === "hexC") return 12;
  return DIGIT.test(action) ? parseInt(action, 16) : -1;
}
function keyAllowed(action, radix) {
  const digit = digitOf(action);
  if (digit >= 0) return digit < radix;
  return action !== "." || radix === 10;
}
function editDraft(draft, key) {
  const d = draft ?? "";
  if (key === "hexC") key = "C";
  if (DIGIT.test(key)) return d === "0" ? key : d === "-0" ? `-${key}` : d + key;
  if (key === ".") return d.includes(".") ? d : `${d === "" || d === "-" ? `${d}0` : d}.`;
  if (key === "back") return d.slice(0, -1);
  if (key === "clear") return "";
  if (key === "sign") return d.startsWith("-") ? d.slice(1) : `-${d}`;
  return d;
}
var KeypadView = class extends BaseView {
  constructor(model, el) {
    super(model, el, TRAITS9);
    this.draft = null;
    this.armed = null;
    const b = this.body;
    b.setAttribute("role", "group");
    b.setAttribute("aria-labelledby", this.labelEl.id);
    b.tabIndex = 0;
    this.display = html("div", { cls: "awi-kp-display", attrs: { role: "status", "aria-live": "polite" } });
    this.msg = html("div", { cls: "awi-entry-msg awi-kp-msg", attrs: { role: "alert" } });
    this.keys = KEYS.map(([text, action, name]) => {
      const kind = /^\d$/.test(action) ? "digit" : digitOf(action) >= 0 ? "digit awi-kp-hex" : action;
      const key = html("button", { cls: `awi-kp-key awi-kp-${kind}`, text, attrs: { type: "button", "aria-label": name } });
      key.addEventListener("click", () => this.press(action));
      return key;
    });
    b.append(this.display, this.msg, html("div", { cls: "awi-kp-grid" }, this.keys));
    b.addEventListener("keydown", (e) => {
      const map = { Enter: "enter", Escape: "cancel", Backspace: "back", Delete: "clear", ",": ".", ".": ".", "-": "sign" };
      const k = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      const hex2 = radixOf(this.get("format")) === 16;
      const action = /^\d$/.test(k) || hex2 && /^[A-F]$/.test(k) ? k === "C" ? "hexC" : k : map[e.key];
      if (!action || !keyAllowed(action, radixOf(this.get("format")))) return;
      e.preventDefault();
      e.stopPropagation();
      this.press(action);
    });
    this.schedule();
  }
  press(action) {
    if (!this.interactive) return;
    if (action === "cancel") {
      this.draft = null;
      this.armed = null;
      this.msg.textContent = "";
    } else if (action === "enter") {
      this.commit();
    } else {
      this.draft = editDraft(this.draft, action);
      this.armed = null;
      this.msg.textContent = "";
    }
    this.schedule();
  }
  commit() {
    if (this.draft === null || this.draft === "" || this.draft === "-") return;
    const r = checkEntry(this.draft, {
      min: parseNumber(this.get("min")),
      max: parseNumber(this.get("max")),
      unit: this.get("unit") || "",
      coerce: !!this.get("coerce"),
      format: this.get("format")
    });
    if (!r.ok) {
      this.msg.textContent = r.reason;
      return;
    }
    const delta = this.get("confirm_delta");
    const current = parseNumber(this.get("value"));
    if (delta !== null && delta !== void 0 && Number.isFinite(current) && Math.abs(r.value - current) > delta && this.armed !== r.value) {
      this.armed = r.value;
      this.msg.textContent = `Large change: press Enter again to set ${withUnit(formatValue(r.value, this.get("format")), this.get("unit"))}`;
      return;
    }
    this.model.set("value", r.value);
    this.model.save_changes();
    this.draft = null;
    this.armed = null;
    this.msg.textContent = "";
  }
  draw() {
    const unit = this.get("unit") || "";
    const editing = this.draft !== null;
    const text = editing ? `${this.draft || "…"}${unit ? ` ${unit}` : ""}` : withUnit(formatValue(parseNumber(this.get("value")), this.get("format")), unit);
    this.display.textContent = text;
    this.display.classList.toggle("awi-kp-editing", editing);
    this.root.classList.toggle("awi-kp-armed", this.armed !== null);
    const on = this.interactive;
    const radix = radixOf(this.get("format"));
    this.keys.forEach((k, i) => {
      const action = KEYS[i][1];
      k.disabled = !on || !keyAllowed(action, radix);
      k.hidden = digitOf(action) >= 10 && radix !== 16;
      if (action === "clear") setText(k, radix === 16 ? "Clr" : KEYS[i][0]);
    });
    const range = `${formatValue(parseNumber(this.get("min")), this.get("format"))} to ${formatValue(parseNumber(this.get("max")), this.get("format"))}`;
    this.body.setAttribute("aria-description", `value ${withUnit(formatValue(parseNumber(this.get("value")), this.get("format")), unit)}, range ${range}${editing ? `, typing ${this.draft}` : ""}`);
  }
};

// js/src/widgets/transmitter.ts
var DEVICE_STATUS = {
  ok: { symbol: "", text: "OK" },
  failure: { symbol: "✕", text: "FAILURE" },
  check: { symbol: "▲", text: "FUNCTION CHECK" },
  out_of_spec: { symbol: "?", text: "OUT OF SPEC" },
  maintenance: { symbol: "◆", text: "MAINTENANCE" }
};
function splitTag(tag) {
  const s = String(tag ?? "").trim();
  const dash = s.indexOf("-");
  if (dash > 0) return [s.slice(0, dash), s.slice(dash + 1)];
  const m = /^([A-Za-z]+)(.*)$/.exec(s);
  return m ? [m[1], m[2]] : [s, ""];
}
var TransmitterView = class extends NumericView {
  constructor(model, el) {
    super(model, el, ["tag", "status", "status_text"], { role: "meter" });
    this.svgEl = svg("svg", { class: "awi-svg", "aria-hidden": "true" });
    this.body.appendChild(this.svgEl);
    this.statusEl = html("div", { cls: "awi-tx-status" });
    this.root.insertBefore(this.statusEl, this.entryMsg);
    this.schedule();
  }
  /** Device status (read through the schema: unknown values read as "ok"). */
  get status() {
    const s = this.get("status");
    return DEVICE_STATUS[s] ? s : "ok";
  }
  renderCommon() {
    super.renderCommon();
    const st = this.status;
    const info = DEVICE_STATUS[st];
    const r = this.root;
    for (const k of Object.keys(DEVICE_STATUS)) r.classList.toggle(`awi-ne107-${k}`, st === k);
    const detail = this.get("status_text") || "";
    this.statusEl.textContent = `${info.symbol ? `${info.symbol} ` : ""}${info.text}${detail ? ` · ${detail}` : ""}`;
    this.statusEl.setAttribute("title", detail || info.text);
    const b = this.body;
    const tag = this.get("tag") || "";
    if (st === "failure") {
      this.valueText.textContent = "✕ BAD";
      b.removeAttribute("aria-valuenow");
      b.setAttribute("aria-valuetext", `invalid value, device failure${detail ? `: ${detail}` : ""}`);
    } else {
      const text = b.getAttribute("aria-valuetext") || "";
      if (st !== "ok") b.setAttribute("aria-valuetext", `${text}, ${info.text.toLowerCase()}${detail ? `: ${detail}` : ""}`);
    }
    if (tag && !this.get("label")) b.setAttribute("aria-label", tag);
  }
  draw() {
    const [w, h] = this.get("size");
    const s = this.svgEl;
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    clear(s);
    const r = Math.min(h / 2 - 4, 34);
    const cx = w / 2;
    const cy = h / 2;
    s.appendChild(svg("circle", { class: "awi-tx-bubble", cx, cy, r }));
    s.appendChild(svg("path", { class: "awi-tx-line", d: `M${cx - r} ${cy}H${cx + r}` }));
    const [letters, loop] = splitTag(this.get("tag"));
    s.appendChild(svgText(letters, { class: "awi-tx-letters", x: cx, y: cy - r * 0.32, "text-anchor": "middle", "dominant-baseline": "central" }));
    s.appendChild(svgText(loop, { class: "awi-tx-loop", x: cx, y: cy + r * 0.36, "text-anchor": "middle", "dominant-baseline": "central" }));
    const st = this.status;
    const x = cx + r * 0.75;
    const y = cy - r * 0.75;
    const k = Math.max(7, r * 0.3);
    const shape = {
      failure: () => svg("circle", { cx: x, cy: y, r: k }),
      check: () => svg("path", { d: `M${x} ${y - k}L${x + k} ${y + k * 0.8}L${x - k} ${y + k * 0.8}Z` }),
      out_of_spec: () => svg("path", { d: `M${x} ${y - k}L${x + k} ${y}L${x} ${y + k}L${x - k} ${y}Z` }),
      maintenance: () => svg("rect", { x: x - k * 0.85, y: y - k * 0.85, width: k * 1.7, height: k * 1.7, rx: 2 })
    }[st];
    if (shape) {
      const g = svg("g", { class: `awi-ne107-symbol awi-ne107-symbol-${st}` });
      g.appendChild(shape());
      g.appendChild(svgText(DEVICE_STATUS[st].symbol, { class: "awi-ne107-glyph", x, y: st === "check" ? y + k * 0.25 : y, "text-anchor": "middle", "dominant-baseline": "central" }));
      s.appendChild(g);
    }
  }
};

// js/src/contract/trend.ts
var LIMITS = ["lolo", "lo", "hi", "hihi", "setpoint"];
var finiteOrNull2 = (v) => {
  const f = typeof v === "number" || typeof v === "string" ? parseNumber(v) : NaN;
  return Number.isFinite(f) ? f : null;
};
function normalizePen(raw, j) {
  const p = typeof raw === "string" ? { name: raw } : raw && typeof raw === "object" ? raw : {};
  let min = finiteOrNull2(p.min) ?? 0;
  let max = finiteOrNull2(p.max) ?? 100;
  if (!(max > min)) [min, max] = [0, 100];
  const pen = {
    name: p.name ? String(p.name) : `pen ${j + 1}`,
    unit: p.unit ? String(p.unit) : "",
    min,
    max,
    color: p.color ? String(p.color) : "",
    format: p.format ? String(p.format) : "%.4g",
    lolo: null,
    lo: null,
    hi: null,
    hihi: null,
    setpoint: null
  };
  for (const k of LIMITS) pen[k] = finiteOrNull2(p[k]);
  return pen;
}
var PenRing = class {
  constructor(capacity) {
    /** Samples added since the last clear. */
    this.total = 0;
    this.capacity = capacity;
    this.t = new Float64Array(capacity);
    this.v = new Float32Array(capacity);
  }
  /** Store the first n samples of ts / vs (only the last `capacity` are kept). */
  push(ts, vs, n) {
    for (let i = Math.max(0, n - this.capacity); i < n; i++) {
      const slot = (this.total + i) % this.capacity;
      this.t[slot] = ts[i];
      this.v[slot] = vs[i];
    }
    this.total += n;
  }
  get size() {
    return Math.min(this.total, this.capacity);
  }
  /** Slot of the k-th oldest buffered sample. */
  slot(k) {
    return (this.total - this.size + k) % this.capacity;
  }
  timeAt(k) {
    return this.t[this.slot(k)];
  }
  valueAt(k) {
    return this.v[this.slot(k)];
  }
  get first() {
    return this.size ? this.timeAt(0) : NaN;
  }
  get last() {
    return this.size ? this.timeAt(this.size - 1) : NaN;
  }
  /** Index of the first sample at or after time t (binary search). */
  lowerBound(t) {
    let lo = 0;
    let hi = this.size;
    while (lo < hi) {
      const mid = lo + hi >> 1;
      if (this.timeAt(mid) < t) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  /** Value at time t, linearly interpolated; NaN outside the buffered span. */
  at(t) {
    const n = this.size;
    if (!n || t < this.first || t > this.last) return NaN;
    const k = this.lowerBound(t);
    if (k >= n) return this.valueAt(n - 1);
    const t1 = this.timeAt(k);
    if (t1 === t || k === 0) return this.valueAt(k);
    const t0 = this.timeAt(k - 1);
    const f = (t - t0) / (t1 - t0 || 1);
    return this.valueAt(k - 1) * (1 - f) + this.valueAt(k) * f;
  }
};

// js/src/widgets/trend.ts
var TRAITS10 = ["pens", "span", "history", "value"];
var SPANS = [
  [60, "1 min"],
  [600, "10 min"],
  [3600, "1 h"],
  [8 * 3600, "8 h"],
  [86400, "24 h"]
];
var pad4 = (n) => String(n).padStart(2, "0");
var STEPS = [1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200, 10800, 21600, 43200, 86400];
function timeTicks(t0, t1, count2 = 5) {
  const span = t1 - t0;
  if (!(span > 0)) return { step: 60, ticks: [] };
  const step = STEPS.find((s) => span / s <= count2) || Math.ceil(span / count2 / 86400) * 86400;
  const off = -new Date(t0 * 1e3).getTimezoneOffset() * 60;
  const ticks2 = [];
  for (let t = Math.ceil((t0 + off) / step) * step - off; t <= t1; t += step) ticks2.push(t);
  return { step, ticks: ticks2 };
}
function timeLabel(t, step = 60) {
  const d = new Date(t * 1e3);
  const hm = `${pad4(d.getHours())}:${pad4(d.getMinutes())}`;
  const text = step < 60 ? `${hm}:${pad4(d.getSeconds())}` : hm;
  return step >= 86400 ? `${pad4(d.getDate())}/${pad4(d.getMonth() + 1)} ${text}` : text;
}
function timeText(t) {
  if (!Number.isFinite(t)) return "";
  const d = new Date(t * 1e3);
  return `${d.getFullYear()}-${pad4(d.getMonth() + 1)}-${pad4(d.getDate())} ${pad4(d.getHours())}:${pad4(d.getMinutes())}:${pad4(d.getSeconds())}`;
}
function parseTime(text, ref = Date.now() / 1e3) {
  const m = /^\s*(?:(\d{4})-(\d{1,2})-(\d{1,2})[ T])?(\d{1,2}):(\d{2})(?::(\d{2}(?:\.\d+)?))?\s*$/.exec(String(text ?? ""));
  if (!m) return NaN;
  const d = m[1] ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(ref * 1e3);
  if (+m[4] > 23 || +m[5] > 59) return NaN;
  d.setHours(+m[4], +m[5], 0, 0);
  return d.getTime() / 1e3 + (m[6] ? parseFloat(m[6]) : 0);
}
function penOf(p, j, colors) {
  const n = normalizePen(p, j);
  return {
    name: n.name,
    unit: n.unit,
    min: n.min,
    max: n.max,
    color: safeColor(n.color) || colors.trace(j),
    format: n.format,
    limits: [n.lolo, n.lo, n.hi, n.hihi].filter((v) => v !== null),
    setpoint: n.setpoint ?? NaN
  };
}
var TrendView = class extends PlotView {
  constructor(model, el) {
    super(model, el, TRAITS10);
    /** Live mode: the view follows new samples (IND-071). */
    this.follow = true;
    this.windowEnd = NaN;
    this.selected = 0;
    this.rings = [];
    this.margin.right = 16;
    this.buildNav();
    this.resetRings();
    this.listen("msg:custom", (msg, buffers) => this.onMessage(msg, buffers));
    this.listen("change:pens", () => this.resetRings());
    this.listen("change:history", () => this.resetRings());
    this.model.send({ type: "sync_request" });
  }
  // -- history navigation (IND-072) ------------------------------------------------------
  buildNav() {
    const nav = html("span", { cls: "awi-trend-nav" });
    const btn = (text, label, onClick) => {
      const b = html("button", { text, attrs: { type: "button", title: label, "aria-label": label } });
      b.addEventListener("click", () => this.canInteract && onClick());
      nav.appendChild(b);
      return b;
    };
    btn("◀", "Earlier", () => this.shift(-0.5));
    btn("▶", "Later", () => this.shift(0.5));
    this.liveBtn = btn("● Live", "Follow the latest data", () => this.goLive());
    this.spanSel = html("select", { cls: "awi-choice", attrs: { "aria-label": "Time span", "data-lm-suppress-shortcuts": "true" } });
    this.spanSel.addEventListener("change", () => {
      if (!this.canInteract) return;
      this.model.set("span", Number(this.spanSel.value));
      this.model.save_changes();
      this.zoom = null;
      this.schedule();
    });
    nav.appendChild(this.spanSel);
    this.toolbar.prepend(nav);
  }
  get span() {
    return this.get("span");
  }
  shift(fraction2) {
    const end = (this.follow ? this.tmax() : this.windowEnd) + fraction2 * this.span;
    this.zoom = null;
    if (fraction2 > 0 && end >= this.tmax()) return this.goLive();
    const first = this.tmin();
    this.follow = false;
    this.windowEnd = Number.isFinite(first) ? Math.max(end, first + this.span * 0.1) : end;
    this.schedule();
  }
  goLive() {
    this.follow = true;
    this.zoom = null;
    this.schedule();
  }
  // -- data ---------------------------------------------------------------------------
  get pens() {
    const colors = this._colors || this.colors();
    return this.get("pens").map((p, j) => penOf(p, j, colors));
  }
  resetRings() {
    const cap = this.get("history");
    this.rings = this.get("pens").map(() => new PenRing(cap));
    this.schedule();
  }
  /** append / snapshot / clear messages (see trendchart.schema.json). */
  onMessage(msg, buffers) {
    if (!msg || typeof msg !== "object") return;
    const m = msg;
    if (m.type === "clear") {
      this.resetRings();
      return;
    }
    if (m.type !== "snapshot" && m.type !== "append") return;
    if (m.type === "snapshot") this.resetRings();
    (Array.isArray(m.pens) ? m.pens : []).forEach((entry, k) => {
      if (!Array.isArray(entry)) return;
      const [i, n, total] = entry.map((v) => Math.max(0, Math.floor(Number(v) || 0)));
      const ring = this.rings[i];
      if (!ring) return;
      const ts = toFloat64(buffers?.[2 * k]);
      const vs = toFloat32(buffers?.[2 * k + 1]);
      const count2 = Math.min(n, ts.length, vs.length);
      if (ring.total < total - n) ring.total = total - n;
      ring.push(ts, vs, count2);
    });
    this.schedule();
  }
  tmax() {
    const last = this.rings.map((r) => r.last).filter(Number.isFinite);
    return last.length ? Math.max(...last) : Date.now() / 1e3;
  }
  tmin() {
    const first = this.rings.map((r) => r.first).filter(Number.isFinite);
    return first.length ? Math.min(...first) : NaN;
  }
  // -- geometry --------------------------------------------------------------------------
  fullRange() {
    if (this.zoom && this.follow) {
      this.follow = false;
      this.windowEnd = this.tmax();
    }
    const end = this.follow ? this.tmax() : this.windowEnd;
    const pens = this.pens;
    this.selected = Math.min(this.selected, Math.max(0, pens.length - 1));
    const p = pens[this.selected] || { min: 0, max: 100 };
    return { x: [end - this.span, end], y: [p.min, p.max] };
  }
  /** Value of pen j on the scale of the selected pen. */
  toAxis(pens, j, v) {
    const p = pens[j];
    const s = pens[this.selected] || p;
    return s.min + (v - p.min) / (p.max - p.min) * (s.max - s.min);
  }
  xTicks(a, b) {
    const { step, ticks: ticks2 } = timeTicks(a, b, 5);
    this._step = step;
    return ticks2;
  }
  xLabel(v) {
    return timeLabel(v, this._step || 60);
  }
  xText(v) {
    return timeText(v);
  }
  parseX(text) {
    return parseTime(text, this.follow ? this.tmax() : this.windowEnd);
  }
  checkX(text) {
    const v = this.parseX(text);
    if (!Number.isFinite(v)) return { ok: false, reason: "Not a time: enter HH:MM:SS or YYYY-MM-DD HH:MM:SS" };
    const [a, b] = this.fullRange().x;
    if (v < a || v > b) return { ok: false, reason: `Out of range: enter a time between ${timeText(a)} … ${timeText(b)}` };
    return { ok: true, value: v };
  }
  cursorText(x) {
    const vals = this.pens.map((p, j) => `${formatValue(this.rings[j]?.at(x) ?? NaN, p.format)}${p.unit ? ` ${p.unit}` : ""}`);
    return `→ ${vals.join(", ")}`;
  }
  // -- drawing ------------------------------------------------------------------------------
  /** Displayed samples of pen j: cb(time, value) with one sample before/after the range. */
  forEachSample(j, r, cb) {
    const ring = this.rings[j];
    if (!ring) return;
    const k0 = Math.max(0, ring.lowerBound(r.x[0]) - 1);
    const k1 = Math.min(ring.size, ring.lowerBound(r.x[1]) + 1);
    for (let k = k0; k < k1; k++) cb(ring.timeAt(k), ring.valueAt(k));
  }
  /** "name value unit" of each pen, from the latest values (value trait). */
  summary(pens) {
    const vals = this.get("value");
    return pens.map((p) => `${p.name} ${formatValue(parseNumber(vals[p.name]), p.format)}${p.unit ? ` ${p.unit}` : ""}`);
  }
  draw() {
    const colors = this._colors = this.colors();
    const pens = this.pens;
    this.drawLegend(pens);
    setAttr(this.body, "aria-label", `${this.get("label") || "Trend"}${this.follow ? "" : " (history)"}: ${this.summary(pens).join(", ")}`);
    const ctx = this.prepareCanvas();
    if (!ctx) return;
    const [w, h] = this.get("size");
    ctx.clearRect(0, 0, w, h);
    const area = this.area();
    const r = this.ranges();
    this.drawAxes(ctx, area, r, colors);
    const { X, Y } = this.mappers(area, r);
    ctx.save();
    ctx.beginPath();
    ctx.rect(area.x, area.y, area.w, area.h);
    ctx.clip();
    pens.forEach((p, j) => {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.7;
      const refs = [
        [p.limits, [6, 4]],
        [Number.isFinite(p.setpoint) ? [p.setpoint] : [], [2, 3]]
      ];
      for (const [values, dash] of refs) {
        ctx.setLineDash(dash);
        for (const v of values) {
          const y = Math.round(Y(this.toAxis(pens, j, v))) + 0.5;
          ctx.beginPath();
          ctx.moveTo(area.x, y);
          ctx.lineTo(area.x + area.w, y);
          ctx.stroke();
        }
      }
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.lineWidth = j === this.selected ? 2 : 1.5;
      ctx.beginPath();
      let pen = false;
      this.forEachSample(j, r, (t, v) => {
        if (!Number.isFinite(v)) {
          pen = false;
          return;
        }
        const x = X(t);
        const y = Y(this.toAxis(pens, j, v));
        if (pen) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
        pen = true;
      });
      ctx.stroke();
    });
    ctx.restore();
    this.drawOverlays(ctx, area, r, colors);
    const sel = pens[this.selected];
    ctx.font = "10px system-ui, sans-serif";
    ctx.textBaseline = "top";
    if (sel) {
      ctx.fillStyle = sel.color;
      ctx.textAlign = "left";
      ctx.fillText(`${sel.name}${sel.unit ? ` (${sel.unit})` : ""}`, area.x + 4, area.y + 3);
    }
    ctx.fillStyle = colors.accent;
    ctx.textAlign = "right";
    ctx.fillText(this.follow ? "● LIVE" : "❚❚ HISTORY", area.x + area.w - 4, area.y + 3);
  }
  renderCommon() {
    super.renderCommon();
    const span = this.span;
    const opts = SPANS.some(([s]) => s === span) ? SPANS : [...SPANS, [span, `${formatValue(span, "%.4g")} s`]].sort((a, b) => a[0] - b[0]);
    if (this.spanSel.options.length !== opts.length) {
      clear(this.spanSel);
      for (const [s, text] of opts) this.spanSel.appendChild(html("option", { text, attrs: { value: String(s) } }));
    }
    this.spanSel.value = String(span);
    if (this.spanSel.disabled !== !this.canInteract) this.spanSel.disabled = !this.canInteract;
    setAttr(this.liveBtn, "aria-pressed", String(this.follow && !this.zoom));
  }
  /** Legend: one button per pen; the selected pen gives the vertical scale. */
  drawLegend(pens) {
    const key = JSON.stringify(pens.map((p) => [p.name, p.color]));
    if (this._legendKey !== key) {
      this._legendKey = key;
      clear(this.legend);
      pens.forEach((p, j) => {
        const sw = html("span", { cls: "awi-swatch" });
        sw.style.background = p.color;
        const b = html("button", { cls: "awi-legend-item awi-pen", attrs: { type: "button", title: `Show the scale of ${p.name}` } }, [sw, html("span")]);
        b.addEventListener("click", () => {
          this.selected = j;
          this.schedule();
        });
        this.legend.appendChild(b);
      });
    }
    setHidden(this.legend, pens.length === 0);
    const summary = this.summary(pens);
    [...this.legend.children].forEach((b, j) => {
      const p = pens[j];
      if (!p || !b.lastChild) return;
      setText(b.lastChild, `${summary[j]} [${formatValue(p.min, "%.4g")} … ${formatValue(p.max, "%.4g")}]`);
      setAttr(b, "aria-pressed", String(j === this.selected));
    });
  }
  // -- export (CHART-107) --------------------------------------------------------------------
  csvRows() {
    const r = this.ranges();
    const rows = [["time", "pen", "value", "unit"]];
    this.pens.forEach((p, j) => {
      this.forEachSample(j, r, (t, v) => {
        if (t >= r.x[0] && t <= r.x[1]) rows.push([new Date(t * 1e3).toISOString(), p.name, v, p.unit]);
      });
    });
    return rows;
  }
  svgContent(area, r, _colors, el) {
    const { X, Y } = this.mappers(area, r);
    const pens = this.pens;
    return pens.map((p, j) => {
      let d = "";
      let pen = false;
      this.forEachSample(j, r, (t, v) => {
        if (!Number.isFinite(v)) {
          pen = false;
          return;
        }
        d += `${pen ? "L" : "M"}${X(t).toFixed(1)} ${Y(this.toAxis(pens, j, v)).toFixed(1)}`;
        pen = true;
      });
      return el("path", { d, fill: "none", stroke: p.color, "stroke-width": 1.5 });
    });
  }
};

// js/src/index.js
var VIEWS2 = {
  knob: RotaryView,
  dial: RotaryView,
  gauge: RotaryView,
  meter: RotaryView,
  compass: RotaryView,
  tank: LinearView,
  thermometer: LinearView,
  fillslide: LinearView,
  vumeter: LinearView,
  sevensegment: SevenSegmentView,
  led: BooleanView,
  toggleswitch: BooleanView,
  rockerswitch: BooleanView,
  slideswitch: BooleanView,
  pushbutton: BooleanView,
  emergencystop: BooleanView,
  waveformchart: ChartView,
  intensitychart: IntensityView,
  digitalgraph: DigitalView,
  mixedgraph: DigitalView,
  alarmindicator: AlarmView,
  picture: PictureView,
  polar: PolarView,
  smith: PolarView,
  radar: PolarView,
  alarmbanner: BannerView,
  valve: ProcessView,
  pump: ProcessView,
  motor: ProcessView,
  pipe: PipeView,
  synoptic: SynopticView,
  analogindicator: AnalogIndicatorView,
  selectorswitch: SelectorView,
  stacklight: StackLightView,
  bitfield: BitFieldView,
  recipetable: RecipeView,
  equipmenttree: TreeView,
  svgpanel: SvgPanelView,
  xygraph: XYView,
  pidfaceplate: PIDView,
  annunciator: AnnunciatorView,
  alarmlist: AlarmListView,
  statemachine: StateMachineView,
  themeswitch: ThemeSwitchView,
  trendchart: TrendView,
  transmitter: TransmitterView,
  eventlog: EventLogView,
  deviation: DeviationView,
  sparkline: SparklineView,
  bargraph: BarGraphView,
  kpitile: KPITileView,
  numericentry: KeypadView
};
function render({ model, el }) {
  const View = VIEWS2[model.get("_kind")];
  if (!View) {
    el.textContent = `anywidget-instruments: unknown widget kind "${model.get("_kind")}"`;
    return void 0;
  }
  const view = new View(model, el);
  return () => view.destroy();
}
function initialize({ model }) {
  watchModel(model);
  return attachDerived(model);
}
var index_default = { initialize, render };
export {
  index_default as default
};
