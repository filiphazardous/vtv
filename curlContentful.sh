#!/bin/bash

curl -s -H "Authorization: Bearer ${TOKEN}" https://cdn.contentful.com/spaces/${SPACE_ID}/entries/ > content.json
