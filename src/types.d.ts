export type Indices = [number, number];

export interface HashtagEntity {
  indices: Indices;
  text: string;
}

export interface UserMentionEntity {
  id_str: string;
  indices: Indices;
  name: string;
  screen_name: string;
}

export interface MediaEntity {
  display_url: string;
  expanded_url: string;
  indices: Indices;
  url: string;
}

export interface UrlEntity {
  display_url: string;
  expanded_url: string;
  indices: Indices;
  url: string;
}

export interface SymbolEntity {
  indices: Indices;
  text: string;
}

export interface TweetEntities {
  hashtags: HashtagEntity[];
  urls: UrlEntity[];
  user_mentions: UserMentionEntity[];
  symbols: SymbolEntity[];
  media?: MediaEntity[];
}

export interface Tweet {
  __typename: "Tweet";
  lang: string;
  favorite_count: number;
  possibly_sensitive: boolean;
  created_at: string;
  conversation_count: number;
  display_text_range: [number, number];
  edit_control: {
    edit_tweet_ids: string[];
    editable_until_msecs: string;
    edits_remaining: string;
    is_edit_eligible: boolean;
  };
  entities: TweetEntities;
  id_str: string;
  isEdited: boolean;
  isStaleEdit: boolean;
  mediaDetails: {
    display_url: string;
    expanded_url: string;
    ext_media_availability: { status: string };
    indices: [number, number];
    media_url_https: string;
    original_info: {
      focus_rects: {
        h: number;
        w: number;
        x: number;
        y: number;
      }[];
    }[];
    sizes: {
      large: { h: number; resize: string; w: number };
      medium: { h: number; resize: string; w: number };
      small: { h: number; resize: string; w: number };
      thumb: { h: number; resize: string; w: number };
    };
    type: string;
    url: string;
  }[];
  news_action_type: string;
  photos: {
    backgroundColor: {
      blue: number;
      green: number;
      red: number;
    };
    cropCandidates: {
      h: number;
      w: number;
      x: number;
      y: number;
    }[];
    expandedUrl: string;
    height: number;
    url: string;
    width: number;
  }[];
  text: string;
  user: {
    id_str: string;
    is_blue_verified: boolean;
    name: string;
    profile_image_shape: string;
    profile_image_url_https: string;
    screen_name: string;
    verified: boolean;
  };
}

// for rendering tweet
interface Section {
  text: string;
  entityIndice: EntityIndice | null;
}

interface EntityIndice {
  type: string;
  indices: Indices;
  hashtags?: HashtagEntity;
  urls?: UrlEntity;
  userMentions?: UserMentionEntity;
  symbols?: SymbolEntity;
  media?: MediaEntity;
}