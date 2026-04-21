import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/%E5%BA%B7%E4%B9%83%E9%A6%A8_Dianthus_caryophyllus_-%E9%A6%99%E6%B8%AF%E8%8A%B1%E5%B1%95_Hong_Kong_Flower_Show-_%289450626234%29.jpg"
const title = "母の日に花を贈るのはなぜ"
const description =
  "母の日にカーネーションを贈る習慣はどこから来たのか。白いカーネーションに込められた由来、赤やピンクの花色の意味、日本で広まった背景をやさしく解説します。"

export const metadata = createColumnMetadata({
  path: "/columns/mothers-day-flowers/",
  title,
  description,
  keywords: [
    "母の日",
    "カーネーション",
    "花を贈る理由",
    "花言葉",
    "Dianthus caryophyllus",
  ],
  ogImage,
  ogImageAlt: "カーネーションの花",
  twitterDescription:
    "母の日にカーネーションを贈る理由を、白い花の由来、花色の意味、日本での広まりから解説します。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/mothers-day-flowers/",
  title,
  description,
  ogImage,
})

const body: React.CSSProperties = {
  color: "#ccc",
  fontSize: "0.875rem",
  lineHeight: 1.85,
  margin: "0 0 0.875rem",
}

const noteStyle: React.CSSProperties = {
  background: "#1e3d1f",
  border: "1px solid #5a9a5c",
  borderRadius: "8px",
  color: "#a0d0a2",
  fontSize: "0.82rem",
  lineHeight: 1.75,
  margin: "1rem 0 0",
  padding: "0.75rem 0.9rem",
}

export default function Page() {
  return (
    <ColumnArticle
      emoji="💐"
      title={title}
      subtitle="カーネーションは、感謝を見える形にした花です"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="カーネーションの花"
    >
      <ColumnIntro>
        {[
          "5月になると、花屋の店先に赤やピンクのカーネーションが並びます。母の日の花としてあまりに定着しているので、理由を考えずに選んでいる人も多いかもしれません。",
          "でも、この習慣の始まりをたどると、最初から赤いカーネーションだったわけではありません。出発点には、ひとりの女性が母をしのんで白いカーネーションを配った出来事があります。",
          "このコラムでは、母の日に花を贈るようになった背景と、なぜカーネーションが象徴になったのかを、植物の特徴や花色の意味と一緒に見ていきます。",
        ].map((text) => (
          <p
            key={text}
            style={{
              margin: 0,
              color: "#bbb",
              fontSize: "0.9rem",
              lineHeight: 1.9,
            }}
          >
            {text}
          </p>
        ))}
      </ColumnIntro>

      <Section title="始まりは、母をしのぶ白いカーネーション">
        <p style={body}>
          現在の母の日の原型は、20世紀初めのアメリカで広まりました。きっかけとしてよく知られているのが、アンナ・ジャービスという女性が、亡き母をしのぶ集まりで白いカーネーションを配ったことです。
        </p>
        <p style={body}>
          白いカーネーションは、アンナの母が好きだった花とされます。そのため、母の日の花はもともと「母への感謝」と同時に、「母を忘れない」という追悼の意味も持っていました。
        </p>
        <div style={noteStyle}>
          いまは明るい贈り物の印象が強い母の日ですが、出発点には「母を思い出す日」という静かな意味がありました。
        </div>
      </Section>

      <Section title="なぜカーネーションが選ばれたのか">
        <p style={body}>
          カーネーションはナデシコ属の園芸植物で、学名は
          <i> Dianthus caryophyllus </i>
          です。花もちがよく、切り花にしても美しさが続きやすいため、贈り物に向いています。
        </p>
        <p style={body}>
          花びらの縁が細かく波打ち、1輪でも華やかに見えることも大きな魅力です。母の日の贈り物としては、扱いやすく、飾りやすく、気持ちを伝えやすい花だったと言えます。
        </p>
        <p style={body}>
          植物として見ると、カーネーションは
          <Link href="/columns/petal-counts" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            花びらの枚数や形
          </Link>
          が人の手で豊かに変化してきた園芸植物でもあります。野の花をそのまま贈るというより、感謝を飾るために育てられてきた花、という見方もできます。
        </p>
      </Section>

      <Section title="赤、ピンク、白。色で意味が変わる">
        <p style={body}>
          母の日といえば赤いカーネーションを思い浮かべる人が多いですが、色によって受け取られ方は少し変わります。赤は母への愛や感謝を表す色として広まり、ピンクはやさしさや温かい気持ちを伝える色として選ばれます。
        </p>
        <p style={body}>
          一方で、白いカーネーションは母の日の始まりに関わる大切な色です。ただ、日本では弔いや追悼の印象を持たれることもあるため、贈り物としては赤やピンク、明るい複色の品種が選ばれやすくなっています。
        </p>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
            marginTop: "1rem",
          }}
        >
          {[
            { color: "#7a1f2a", label: "赤", text: "まっすぐな感謝や愛情を伝えやすい定番色。" },
            { color: "#8a3d5c", label: "ピンク", text: "やわらかく、親しみやすい印象で贈りやすい色。" },
            { color: "#d8d8c8", label: "白", text: "母の日の由来に近い色。追悼の意味も意識されます。" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "#242424",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "0.85rem",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  color: "#e0e0e0",
                  display: "flex",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  gap: "0.5rem",
                  marginBottom: "0.35rem",
                }}
              >
                <span
                  style={{
                    background: item.color,
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: "999px",
                    display: "inline-block",
                    height: "0.9rem",
                    width: "0.9rem",
                  }}
                />
                {item.label}
              </div>
              <div style={{ color: "#aaa", fontSize: "0.8rem", lineHeight: 1.7 }}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="日本では、行事と花屋を通じて広まった">
        <p style={body}>
          日本でも母の日は、学校や教会、百貨店、花屋などを通じて少しずつ広まりました。現在では5月第2日曜日に、カーネーションや季節の花を贈る行事として定着しています。
        </p>
        <p style={body}>
          カーネーションだけでなく、
          <Link href="/plants/196" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            バラ
          </Link>
          や
          <Link href="/plants/31" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            アジサイ
          </Link>
          、鉢植えの花を選ぶ人も増えています。とくにアジサイは、初夏に向かう季節感があり、長く楽しめる贈り物として人気があります。
        </p>
        <p style={body}>
          つまり、母の日の花は「カーネーションでなければならない」という決まりではありません。大切なのは、花をきっかけにして感謝を言葉にしやすくすることです。
        </p>
      </Section>

      <Section title="花は、気持ちを渡しやすくする道具">
        <p style={body}>
          母の日に花を贈る理由をひとことで言えば、感謝を形にしやすいからです。直接「ありがとう」と言うのが少し照れくさいときでも、花があると気持ちを差し出しやすくなります。
        </p>
        <p style={body}>
          カーネーションは、その象徴として長く使われてきました。由来を知ると、赤い花も白い花も、ただの飾りではなく「母を思う日」のしるしに見えてきます。
        </p>
        <div style={noteStyle}>
          花を選ぶときは、由来や花言葉だけに縛られすぎなくても大丈夫です。相手が好きな色、飾りやすい形、長く楽しめる鉢植えなど、その人に合う花を選ぶことも立派な母の日の贈り方です。
        </div>
      </Section>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1.5rem",
          fontSize: "0.8rem",
        }}
      >
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
        <Link href="/columns/petal-counts" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：花びらの枚数で見る植物の分類 →
        </Link>
      </div>
    </ColumnArticle>
  )
}
