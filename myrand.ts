import { Command } from "https://deno.land/x/cliffy@v0.19.6/command/mod.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";

const { options, args } = await new Command()
  .name("myrand")
  .version("myrand 0.1.0")
  .description("for generating subtle random strings")
  .arguments("[count] [length]")
  .option("-a --alpha", "Generate Alphanumeric strings")
  .option("-u --uuid", "Use UUID v4")
  .parse(Deno.args);

const count = (args[0] && Number(args[0])) ?? 1;
const length = (args[1] && Number(args[1])) ?? 12;

if (options.uuid) {
  for (let i = 0; i < count; i++) {
    console.log(crypto.randomUUID());
  }
  Deno.exit();
}

const genRandomString = () => {
  const type = options.alpha ? "alphanumeric" : "ascii-printable";
  return cryptoRandomString({ length, type });
};

for (let i = 0; i < count; i++) {
  console.log(genRandomString());
}
Deno.exit();
