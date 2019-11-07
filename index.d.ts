declare module 'execute-cli' {
  export default function executeCliCommand(
    bashText: string,
    executeCliOptions?: {
      isLookForErrors: boolean;
      isSplitByEnter: boolean;
    }
  ): Promise<{
    errors: Array<string>;
    body: Array<string>;
  }>;
}
