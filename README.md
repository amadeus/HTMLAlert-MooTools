HTMLAlert
===========

A simple class that can be used in place of alert('message') to generate non-blocking, html based alerts using Alert('message') or new HTMLAlert('message') instead.

It also includes a basic queueing system so if multiple Alerts are called in sequence, the end user will still get them.