import json
import time
import requests
import settings


def run_demo():
    blue = {
        "on": True,
        "sat": 255,
        "bri": 255,
        "hue": 43690
    }
    red = {
        "on": True,
        "sat": 255,
        "bri": 255,
        "hue": 0
    }
    green = {
        "on": True,
        "sat": 255,
        "bri": 255,
        "hue": 21845
    }
    off = {
        "on": False
    }
    light_1 = "http://{0}/api/newdeveloper/lights/1/state".format(
        settings.PHILIPS_HUE_IP)
    light_2 = "http://{0}/api/newdeveloper/lights/2/state".format(
        settings.PHILIPS_HUE_IP)
    light_3 = "http://{0}/api/newdeveloper/lights/3/state".format(
        settings.PHILIPS_HUE_IP)

    requests.put(light_1, json.dumps(off))
    requests.put(light_3, json.dumps(off))
    requests.put(light_2, json.dumps(off))
    try:
        while True:
            requests.put(light_1, json.dumps(red))
            time.sleep(0.5)
            requests.put(light_1, json.dumps(off))
            requests.put(light_3, json.dumps(green))
            time.sleep(0.5)
            requests.put(light_3, json.dumps(off))
            requests.put(light_2, json.dumps(blue))
            time.sleep(0.5)
            requests.put(light_1, json.dumps(off))
            requests.put(light_3, json.dumps(off))
            requests.put(light_2, json.dumps(off))
    except KeyboardInterrupt:
        requests.put(light_1, json.dumps(off))
        requests.put(light_3, json.dumps(off))
        requests.put(light_2, json.dumps(off))

if __name__ == "__main__":
    run_demo()