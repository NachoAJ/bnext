### Arranque del proyecto

Para instalar y arranacar el proyecto deberemos seguir los siguientes pasos:
- Clonar este repositorio con el comando `git clone https://github.com/NachoAJ/nestJS-API`
- Entrar al directorio del proyecto con `cd bnext`
- Ejecutar `docker build -t nestjs-api .` y a continuacion `docker run -d -p 3005:3000 nestjs-api`

Asi tendremos nuestro API corriendo y escuchando en nuestro puerto local 3005

## Endpoint

http://localhost:3005/users

### Request

| Método | URL                  |
| ------ | -------------------- |
| Post   | /add                 |

Para añadir usuarios a la base de datos deberemos llamar a `http://localhost:3005/users/add` con los siguientes parametros:

| Type | Params      | Values   | Required |
| ---- | ----------- | -------- | -------- |
| JSON | `name`      | `string` | True     |
| JSON | `lastName`  | `string` | True     |
| JSON | `phone`     | `string` | True     |

- `name` - **`String`** - Nombre dek usuario
- `lastName` - **`String`** Apellido del usuario
- `phone` - **`String`**- Número de teléfono del usuario

### Response

**Exitosa**

```json
{
  "id": "id del usuario insertado en base de datos"
}
```

**Error**

```json
{
  "error": "Mensaje de error"
}
```

### Request

| Método | URL                  |
| ------ | -------------------- |
| Post   | /add-contacts                 |

Para asociar contactos a los usuarios deberemos llamar a `http://localhost:3005/users/add-contacts` con los siguientes parametros:

| Type | Params      | Values   | Required |
| ---- | ----------- | -------- | -------- |
| JSON | `userId`    | `string` | True     |
| JSON | `contacts`  | `array`  | True     |

Siendo el array de `contacts` de la forma: `[{ “contactName”:<nombre>, “phone”:<phone> }]`

- `userId` - **`String`** - id del usuario al que queremos añadir los contactos
- `contacts` - **`Array`** Array de contacto que queremos añadir

### Response

**Exitosa**

```json
{
  "ok": 1, "msg": "Contacts added"
}
```

**Error**

```json
{
  "error": "Mensaje de error"
}
```

### Request

| Método | URL                  |
| ------ | -------------------- |
| Post   | /get-common-contacts                 |

Para ver los contactos comunes entre dos usuarios deberemos llamar a `http://localhost:3005/users/get-common-contacts` con los siguientes parametros:

| Type | Params      | Values   | Required |
| ---- | ----------- | -------- | -------- |
| JSON | `userId1`   | `string` | True     |
| JSON | `userId2`   | `string` | True     |

- `userId1` - **`String`** - id del primer usuario
- `userId2` - **`Array`** - id del segundo usuario

### Response

**Exitosa**

Array de contactos comunes.

**Error**

```json
{
  "error": "Mensaje de error"
}
```

### Request

| Método | URL                  |
| ------ | -------------------- |
| Post   | /get-all-contacts    |

Para ver todos los contactos de un usuario deberemos llamar a `http://localhost:3005/users/get-all-contacts` con los siguientes parametros:

| Type | Params      | Values   | Required |
| ---- | ----------- | -------- | -------- |
| JSON | `userId`   | `string` | True     |

- `userId` - **`String`** - id del usuario

### Response

**Exitosa**

Array de contactos.

**Error**

```json
{
  "error": "Mensaje de error"
}
```
