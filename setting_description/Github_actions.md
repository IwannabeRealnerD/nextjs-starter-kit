# Github actions

- This document serves as a comprehensive guide to implementing generic GitHub Actions within this project.

## 1. enforce-dev-branch.yml

- This action is used to enforce that only dev branch can open PR to main branch.
- The target branch is not restricted to main because if a user mistakenly opens a PR to the wrong branch and then closes it to open a correct one, the status of the action remains failed, despite the PR being valid.
