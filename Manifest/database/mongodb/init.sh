#!/bin/bash

mongo --quiet <<EOF
db.getSiblingDB("admin").createUser({
    user : "iniusernamecoy",
    pwd  : "inipasswordcoooooyyyy",
    roles: [ { role: "root", db: "admin" } ]
});
EOF