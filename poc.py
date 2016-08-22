import hashlib
from Crypto.Cipher import AES
import binascii

# Example 1: decrypt example from the PoC document, using the given key and ciphertext, lets
# get the plain text out of it.

IV = "This is an IV456"
ciphertext= "xLBmOjbWuzEvtn3tKk2S3R9pqD1+V48Tuotw+cKw0ET+Ao/+5xUZ30Mz6UA9UJRts5p5aaR20jakZnNIEoqfdjRdhG37R2P0gwklCdlk2yQaPjzeDfEYtymgbrfldPZQrPNo++c1YhausYhYIoPgHlNYI4o6m+XQ24Bje5l9Xk56QxkT6W6VNURUy36A4wf8e7dwbEariTBURGDXQdPeIvrVDoIWrJJG7rrZVStktNt7KKUoGA+ha//O6TsNZcFX9DZJx3fUQk5FtiYdpsRjItoRcOvVu0fdHOSnmgWfiuHMU5piS9b29/hNWIxbuj+NbJk3L4qLeCrvFLRsycBxjWODGYZ8cSN1HHUrfd/VZubcwup0smPv7rxudcqfevU0e+UXX4Nr+GYq/eyVGeXNwmLwGH8d5J+vQagxn/TrzDTWhRMpUO1jQpUZ8+tZTo0JTeACT6flq72VOtgbbg4QJJocukIbTeyEr+MNR5vj1doJig1whflChMWO73j6wYRfF9imR8FGuypms3+kIq4dseHs4xkn0dfLuMkvE3I/6yp0sT2hlcL4wsXjiCuKRQrRtbU5U20T+VTs1miuugvVECh5R6nFyfZHOiejEKgl5aRU8RfyaCM3uce2fulYAY8If2sPZ55iTJjv/Rf7jBzNkkJOIwwBGLhaCnDNivFVa//J9DZvbE/QW5XjhgCJCpi92iCpSGPNVma9ZAKt0zEz/68gR8zUHzZlRH0Tm9ikmgZyMVtEbqOrcLU8z31bm7+iOUiz/JplmS5xU3SyaqT7dwcGaT+IEAwGAmfUvQrMYa+XDNyoc44feQfR5BH/e5x1QJ+qCKOeeLSe7peNTspr/zzyWjZFqB5F3MDTJWZ2pHaNQdjeP3VBYQ1KpBlK+zsht0pjKWx8amlJN5qonnuHuEH8TNAUR3pDRIJpVJwEfhp9pSdoU4rIPEED3XjCpQ4qLLa7RZ+xZqFnRH+5YVoYT52NgInkxgbFOKy5W7FLNUg="

#the key must be converted to bytes for this python fucntion to work.

aeskey = binascii.unhexlify("8bdeb00d47741b3c169dba2f3cb20a00aa4fd52ab950d5ac4d6c78c0dc782a23")

# set up the decrypter object, setting CBC mode, passing the key and the IV
decryptor = AES.new(aeskey, AES.MODE_CBC, IV)

# the cipher text must be converted to bytes before it can be decrypted.
plain = decryptor.decrypt(binascii.a2b_base64(bytes(ciphertext,'utf-8')))

print ("\nDecrypted text:")
print (plain)
# the plain text above will need padding (PKCS7) removed in the final solution, your
# JS lib may do this automatically.


##### Example 2:  derive AES key :from user's password and UUID

password = "12341234"
salt = "This is a salt" # should normally be the users UUID that the API rerutns AFTER login.

# derive the key with 1000 rounds of sha256 using the PBKDF2 lib
# giving a 32 byte key that is used for AES encryption and decryption

derivedkey = hashlib.pbkdf2_hmac('sha256', bytes(password,'utf-8'), bytes(salt,'utf-8'), 1000, dklen=32)

# note this is not going to produce the same key as in example 1 as the inputs are different.
# you should be able to derive exactly the same key in JS using the same password and salt as in this example
print ("\nDerived key example:")
print (binascii.hexlify(derivedkey))
