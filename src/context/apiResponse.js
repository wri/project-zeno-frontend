export default [
  {
    "type": "tool",
    "tool_name": "context-layer-tool",
    "message": "WRI/SBTN/naturalLands/v1/2020",
    "artifact": null
  }, {
    "type": "tool",
    "tool_name": "location-tool",
    "message": "[265085]",
    "artifact": {
      "type": "FeatureCollection",
      "features": [
        {
          "geometry": {
            "coordinates": [
              [
                [
                  [
                    -8.296710967999957,
                    40.919563293000124
                  ],
                  [
                    -8.30863761899991,
                    40.918823241000155
                  ],
                  [
                    -8.31846141699998,
                    40.92485809400006
                  ],
                  [
                    -8.318773268999848,
                    40.92707443300003
                  ],
                  [
                    -8.298451423999893,
                    40.93067169200003
                  ],
                  [
                    -8.296360968999977,
                    40.92555618400007
                  ],
                  [
                    -8.296710967999957,
                    40.919563293000124
                  ]
                ]
              ]
            ],
            "type": "MultiPolygon"
          },
          "id": "265085",
          "properties": {
            "GID_0": "PRT",
            "GID_1": "PRT.1_1",
            "GID_2": "PRT.1.4_1",
            "GID_3": "PRT.1.4.20_1",
            "GID_4": "",
            "GID_5": "",
            "name": "Arouca Aveiro V\u00e1rzea Portugal",
            "gadmid": "PRT.1.4.20_1"
          },
          "type": "Feature"
        }
      ]
    }
  }, {
    "type": "tool",
    "tool_name": "dist-alerts-tool",
    "message": "{\"PRT.1.4.20_1\": {\"natural forests\": 509, \"natural short vegetation\": 18, \"crop\": 76, \"built\": 1851, \"non-natural tree cover\": 92, \"non-natural short vegetation\": 15}}",
    "artifact": {
      "type": "FeatureCollection",
      "columns": {
        "count": "Long<0, 4294967295>",
        "label": "Short<0, 255>",
        "system:index": "String"
      },
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "geodesic": false,
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -8.318187472034936,
                  40.925104642778315
                ],
                [
                  -8.317289156750803,
                  40.925104642778315
                ],
                [
                  -8.317289156750803,
                  40.92600295806243
                ],
                [
                  -8.318187472034936,
                  40.92600295806243
                ],
                [
                  -8.318187472034936,
                  40.925104642778315
                ]
              ]
            ]
          },
          "id": "+191004+37931",
          "properties": {
            "count": 1,
            "label": 13
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "geodesic": false,
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -8.302916112204912,
                  40.9242063274942
                ],
                [
                  -8.30201779692078,
                  40.9242063274942
                ],
                [
                  -8.30201779692078,
                  40.925104642778315
                ],
                [
                  -8.302916112204912,
                  40.925104642778315
                ],
                [
                  -8.302916112204912,
                  40.9242063274942
                ]
              ]
            ]
          },
          "id": "+191021+37932",
          "properties": {
            "count": 1,
            "label": 13
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "geodesic": false,
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -8.298424535784306,
                  40.92330801221007
                ],
                [
                  -8.297526220500174,
                  40.92330801221007
                ],
                [
                  -8.297526220500174,
                  40.9242063274942
                ],
                [
                  -8.298424535784306,
                  40.9242063274942
                ],
                [
                  -8.298424535784306,
                  40.92330801221007
                ]
              ]
            ]
          },
          "id": "+191026+37933",
          "properties": {
            "count": 1,
            "label": 13
          }
        }
      ]
    }
  }, {
    "type": "assistant",
    "message": "Here are the disturbance alerts in Aveiro summarized by land cover:\n\n- **Natural Forests**: 509 alerts\n- **Natural Short Vegetation**: 18 alerts\n- **Crop**: 76 alerts\n- **Built**: 1851 alerts\n- **Non-Natural Tree Cover**: 92 alerts\n- **Non-Natural Short Vegetation**: 15 alerts\n\nIf you need more information or further analysis, feel free to ask!"
  }
];
