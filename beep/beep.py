import RPi.GPIO as GPIO
from time import sleep

PIN = 21

GPIO.setwarnings(False)

GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN, GPIO.OUT)

GPIO.output(PIN, True)
sleep(.25)
GPIO.output(PIN, False)
sleep(.25)
