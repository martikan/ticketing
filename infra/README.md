# Infrastructure

## Create a secret for the JWT token

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY="AAABASWLQASDQWASOMxasd123"
```
