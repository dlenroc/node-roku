const ROKU_MESSAGES_PATTERN =
  /Shell\.create\('Roku\.Message'\)\.trigger\('[\w\s]+',\s+'(\w+)'\)\.trigger\('[\w\s]+',\s+'(.*?)'\)/gim;

const ROKU_ERROR_PATTERN =
  /{\s*"text"\s*:\s*("[^"]+")\s*,\s*"text_type"\s*:\s*"text"\s*,\s*"type"\s*:\s*"error"/gim;

export function parseRokuMessages(text: string): RokuMessages {
  const results: RokuMessages = { errors: [], infos: [], successes: [] };

  for (const [, type, message] of text.matchAll(ROKU_MESSAGES_PATTERN)) {
    switch (type!.toLowerCase()) {
      case 'error':
        results.errors.push(message!);
        break;
      case 'info':
        results.infos.push(message!);
        break;
      case 'success':
        results.successes.push(message!);
        break;
    }
  }

  for (const [, message] of text.matchAll(ROKU_ERROR_PATTERN)) {
    results.errors.push(JSON.parse(message!));
  }

  return results;
}

type RokuMessages = {
  errors: string[];
  infos: string[];
  successes: string[];
};
