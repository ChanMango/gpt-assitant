/**
 * Chat-GPT API Request Parameters and Description Interface
 * link: https://platform.openai.com/docs/api-reference
 */
export interface ChatGptApiRequestParams {
    /**
     * The GPT model engine name for text generation.
     */
    engine: string;
    /**
     * The text prompt the generator uses to generate text in context.
     */
    prompt: string;
    /**
     * The "creativity" factor of the generated text. A float value between 0 and 1.
     */
    temperature?: number;
    /**
     * The maximum length, in token count, of the generated text.
     */
    maxTokens?: number;
    /**
     * The number of text completions to generate.
     */
    n?: number;
    /**
     * A string or array of strings that, when encountered in the generated text, cause generation to stop.
     */
    stop?: string | string[];
    /**
     * The punishment value for tokens in the generated text that match those in the prompt.
     */
    presencePenalty?: number;
    /**
     * The punishment value for repeated sequences of tokens in the generated text.
     */
    frequencyPenalty?: number;
    /**
     * The number of text completions generated, from which to return the best result.
     */
    bestOf?: number;
}