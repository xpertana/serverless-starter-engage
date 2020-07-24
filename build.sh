#!/bin/sh
now --prod > ./nowurl.txt
export URL=`cat ./nowurl.txt`
now alias $URL serverless.xpe.run
