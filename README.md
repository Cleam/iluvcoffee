# ILUVECOFFEE

A nestjs demo project. Base on [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## typeorm migration

```bash
# 1. 生成迁移脚本
$ pnpm typeorm migration:create src/migrations/CoffeeRefactor
# 2. 修改生成的迁移脚本 !!!
# 3. 打包代码
$ pnpm build
# 4. 运行迁移
$ pnpm typeorm migration:run -d data-source.ts

# 修改了schema之后 生成迁移脚本
$ pnpm typeorm migration:generate src/migrations/CoffeeRefactor -d data-source.ts
```
