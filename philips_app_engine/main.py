#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import time
import webapp2
import json
import requests
import settings

GREEN = 21845
RED = 0

BRIGHTNESS_MAX = 255


class MainHandler(webapp2.RequestHandler):

    def __init__(self, *args, **kwargs):
        super(MainHandler, self).__init__(*args, **kwargs)
        self.left_light = "http://{0}/api/newdeveloper/lights/1/state".format(
            settings.PHILIPS_HUE_IP)
        self.centr_light = "http://{0}/api/newdeveloper/lights/3/state".format(
            settings.PHILIPS_HUE_IP)
        self.right_light = "http://{0}/api/newdeveloper/lights/1/state".format(
            settings.PHILIPS_HUE_IP)

    def __dict_for(self, hue_color, bright):
        return {
            "on": True,
            "sat": 255,
            "bri": bright,
            "hue": hue_color
        }

    def get(self):
        self.response.out.write("Method GET not supported")

    def post(self):
        jsonstring = self.request.body
        data = json.loads(jsonstring)

        values = data.get("values", [])
        min_impr = 0
        max_impr = 0
        min_vol = 0
        max_vol = 0
        tmp_impr = []
        tmp_vol = []

        for value in values:
            impressions = value.get("impressions")
            tmp_impr.append(impressions)
            volume = value.get("volume")
            tmp_vol.append(volume)
            min_impr = min(min_impr, impressions)
            max_impr = max(max_impr, impressions)
            min_vol = min(min_vol, volume)
            max_vol = max(max_vol, volume)

        rate_impr = GREEN / (max_impr - min_impr)
        list_impr = [(impr - min_impr) * rate_impr for impr in tmp_impr]

        rate_vol = BRIGHTNESS_MAX / (max_vol - min_vol)
        list_vol = [(vol - min_vol)* rate_vol for vol in tmp_vol]

        for i in range(len(list_impr)):
            json_dict = self.__dict_for(list_impr[i], list_vol[i])
            requests.put(self.left_light, json.dumps(json_dict))
            time.sleep(0.5)

        requests.put(self.left_light, json.dumps({"on": False}))

        self.response.headers['Content-Type'] = 'application/json'
        obj = {
            'request': 'OK',
        }
        self.response.out.write(json.dumps(obj))



app = webapp2.WSGIApplication([('/', MainHandler)], debug=True)
