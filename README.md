# Project-3--Server

End points

Server Routes:

| METHOD     |        URL               | DESCRIPTION              
|-------|--------------------------|--------------------|
|POST   | api/auth/singup            |  Singup user |
|POST |    api/auth/login             | Login user|
|GET |     api /auth/verify      | Verify |


| METHOD     |         URL          | DESCRIPTION              
|-------|--------------------------|--------------------
|GET   | api/cars/all        |  get all cars |
|GET   | api/cars/:car_id        |  get one car by id|
|POST   | api/cars/create        |  create car|
|PUT   | api/cars/:car_id/edit        |  edit car|
|DELETE   | api/cars/:car_id/delete      |  delete car|

| METHOD     |         URL          | DESCRIPTION              
|-------|--------------------------|--------------------|
|POST   | api/booking/create      |  create bookings|
|GET   | api/booking/all      |  get all bookings|
|GET   | api/booking/:booking_id      |  get one booking by id|
|PUT   | api/booking/:booking_id/edit    |edit booking|
|DELETE   | api/booking/:booking_id/delete    |delete booking|

| METHOD  |            URL             | DESCRIPTION              
|-------|--------------------------|--------------------|
|GET      | /user/all                  |  all users          |
|GET      | /user/:user_id             |  get one user by id |
|PUT     | /user/:user_id/edit        |  edit user          |
|PUT     | /user/edit-image          |  edit image user    |
|DELETE     | /user_id/delete        |  delete user        |

Client Routes:
|            URL             | DESCRIPTION              
|--------------------------|--------------------
|/registro             |  signup-user       |
|/iniciar-sesion       | login              | 
|/inicio               | home               |
|/lista-coches         | car-list           |
|/detalle-coche/:car_id| car-details        |
|/perfil               | profile            |
|/pago                 | paymment           |
|/cerrar-sesion        | logout             |
|/*                     | error           |


