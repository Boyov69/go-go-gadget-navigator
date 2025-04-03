
import { CommandPatterns } from '../types/commandTypes';

// Command patterns for basic natural language understanding
export const commandPatterns: CommandPatterns = {
  navigation: [
    /navigate to (.+)/i,
    /take me to (.+)/i,
    /directions to (.+)/i,
    /go to (.+)/i,
    /how (do|can) I get to (.+)/i
  ],
  search: [
    /find (.+)/i,
    /search for (.+)/i,
    /look up (.+)/i,
    /locate (.+)/i
  ],
  settings: [
    /change settings/i,
    /open settings/i,
    /settings/i,
    /preferences/i,
    /change (.*) preferences/i
  ],
  help: [
    /help/i,
    /how (do|can) I (.+)/i,
    /what can you do/i,
    /show me how to (.+)/i
  ],
  tab_control: [
    /open (.*) tab/i,
    /switch to (.*) tab/i,
    /show (.*) tab/i,
    /select (.*) tab/i,
    /go to (.*) tab/i,
  ],
  app_navigation: [
    /open (.*) page/i,
    /navigate to (.*) page/i,
    /show me (.*) page/i,
    /go to (.*) page/i,
    /take me to (.*) page/i
  ],
  web_navigation: [
    /search (the web|online) for (.+)/i,
    /look up (.+) online/i,
    /find information about (.+)/i,
    /search google for (.+)/i,
    /check (.*) website/i,
    /open website (.+)/i
  ]
};
