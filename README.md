# CodeGPT

CodeGPT is a custom ChatGPT-like interface using the OpenAI API with an emphasis on assistance with code generation.

Here's a video showing the dynamic updating nature of the conversation, as well as automatic user prompt syntax highlighting:

https://github.com/leepavelich/codegpt/assets/7843096/92c45275-b91b-4bb1-bf14-024a6d1b2266

### TODOs:

- Add a db to store conversations
- Add various system prompt wrappers (as tabs?), for example
  - Paste the git diff along with a PR template, automatically remove changes like `package-lock.json` along with custom instructions for creating a PR descriptions ("Use the first person, link to documentation where appropriate, etc")
