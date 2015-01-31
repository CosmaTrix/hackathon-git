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
from urlparse import urljoin
import webapp2
import json
import requests
import settings

GREEN = 21845.
RED = 0

BRIGHTNESS_MAX = 255.


class MainHandler(webapp2.RequestHandler):

    def __init__(self, *args, **kwargs):
        super(MainHandler, self).__init__(*args, **kwargs)
        self.lights = {
            0: "http://{0}/api/newdeveloper/lights/1/".format(
                settings.PHILIPS_HUE_IP),
            1: "http://{0}/api/newdeveloper/lights/3/".format(
                settings.PHILIPS_HUE_IP),
            2: "http://{0}/api/newdeveloper/lights/2/".format(
                settings.PHILIPS_HUE_IP),
        }
        self.last_light = 2

    def __dict_for(self, hue_color, bright):
        return {
            "on": True,
            "sat": 255,
            "bri": bright,
            "hue": hue_color
        }

    def __request_dict_from_resp(self, data):
        return {
            "on": data["state"]["on"],
            "sat": data["state"]["sat"],
            "br": data["state"]["bri"],
            "hue": data["state"]["hue"],
        }

    def __sequence_lights(self, data):
        resp = requests.get(self.lights[1])
        data_1 = json.loads(resp.text)
        requests.put(urljoin(self.lights[2], 'state'), json.dumps(
            self.__request_dict_from_resp(data_1)))

        resp = requests.get(self.lights[0])
        data_0 = json.loads(resp.text)
        requests.put(urljoin(self.lights[1], 'state'), json.dumps(
            self.__request_dict_from_resp(data_0)))

        requests.put(urljoin(self.lights[0], 'state'), json.dumps(data))

    def __turn_lights_off(self):
        off_data = json.dumps({"on": False})
        requests.put(urljoin(self.lights[0], 'state'), off_data)
        time.sleep(0.1)
        requests.put(urljoin(self.lights[1], 'state'), off_data)
        time.sleep(0.1)
        requests.put(urljoin(self.lights[2], 'state'), off_data)
        time.sleep(0.1)

    def get(self):
        fh = open("index.html", "r")
        self.response.headers['Content-Type'] = 'text/html'
        self.response.out.write(fh.read())

    def post(self):
        jsonstring = self.request.body
        print "REQUEST"
        print jsonstring
        print "============="
        data = json.loads(jsonstring)

        values = data.get("values", [])
        max_impr = 1
        max_vol = 1
        tmp_impr = []
        tmp_vol = []

        for value in values:
            impressions = value.get("impressions")
            tmp_impr.append(impressions)
            volume = value.get("volume")
            tmp_vol.append(volume)
            max_impr = max(max_impr, impressions)
            max_vol = max(max_vol, volume)

        rate_impr = GREEN / max_impr
        list_impr = [int(impr * rate_impr) for impr in tmp_impr]

        rate_vol = BRIGHTNESS_MAX / max_vol
        list_vol = [int(vol * rate_vol) for vol in tmp_vol]

        response = {}

        for i in range(len(list_impr)):
            json_dict = self.__dict_for(list_impr[i], list_vol[i])
            self.__sequence_lights(json_dict)
            json_dict["count"] = i
            generated = response.get("generated", [])
            generated.append(json_dict)
            response["generated"] = generated
            time.sleep(data.get("interval", 0.5))

        self.__turn_lights_off()
        self.response.headers['Content-Type'] = 'application/json'
        response["status"] = "OK"
        self.response.out.write(json.dumps(response))


app = webapp2.WSGIApplication([('/', MainHandler)], debug=True)
