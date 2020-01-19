---
layout: post
title: Ruby, meaning of a ||= b and a|| a=b
---



`a ||= b` is a conditional assignment operator. 
It means if `a` is undefined or falsey, then evaluate `b` and set `a` to the result. 
Equivalently, if `a` is defined and evaluates to truthy, then `b` is not evaluated, and no assignment takes place.

It is a near-shorthand for `a || a = b`.
The difference is that, when a is undefined, `a || a = b` would raise NameError, whereas `a ||= b` sets `a` to `b.`
