export default async function search({
  endpoint,
  source,
  accessToken,
  proximity = '',
  bbox = '',
  types = '',
  query,
  onResult,
}) {
  const searchTime = new Date();
  const uri = `${endpoint}/geocoding/v5/${
    source}/${encodeURIComponent(query)
  }.json?access_token=${accessToken
  }${proximity
    ? `&proximity=${proximity}`
    : ''
  }${bbox ? `&bbox=${bbox}` : ''
  }${types
    ? `&types=${encodeURIComponent(types)}`
    : ''
  }`;

  const data = await (await fetch(uri)).json();

  onResult(data, searchTime);
}
