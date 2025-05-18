using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using TMPro;

public class MegaPolisQuizUI : MonoBehaviour, IPointerClickHandler
{
    [Header("References")]
    public RawImage mapImage;
    public MegaPolisUIManager uiManager;

    [Header("Audio")]
    public AudioSource audioSource;      // adaugă component AudioSource
    public AudioClip correctSound;       // corect.wav
    public AudioClip wrongSound;         // wrong.wav

    private RectTransform rt;
    private List<Region> regions = new List<Region>();
    private List<string> questions = new List<string>();
    private int currentIndex = 0;
    private int score = 0;

    struct Region
    {
        public string name;
        public List<Vector2> uvPoly;
        public Region(string n, Vector2[] pts)
        {
            name   = n;
            uvPoly = new List<Vector2>(pts);
        }
    }

    void Awake()
    {
        rt = mapImage.rectTransform;

        // Definirea regiunilor UV
        regions.Add(new Region("Banana Albastră", new Vector2[]{
            new Vector2(0.26f, 0.66f),
            new Vector2(0.46f, 0.48f),
            new Vector2(0.47f, 0.35f),
            new Vector2(0.58f, 0.36f),
            new Vector2(0.57f, 0.55f),
            new Vector2(0.32f, 0.70f)
        }));
        regions.Add(new Region("Banana de Aur", new Vector2[]{
            new Vector2(0.24f, 0.12f),
            new Vector2(0.41f, 0.35f),
            new Vector2(0.54f, 0.28f)
        }));
        regions.Add(new Region("Banana Verde", new Vector2[]{
            new Vector2(0.61f, 0.37f),
            new Vector2(0.76f, 0.52f),
            new Vector2(0.69f, 0.73f)
        }));
        regions.Add(new Region("Golful Finlandei", new Vector2[]{
            new Vector2(0.70f, 0.90f),
            new Vector2(0.81f, 0.89f),
            new Vector2(0.86f, 0.98f)
        }));
        regions.Add(new Region("Axa Atlantică", new Vector2[]{
            new Vector2(0.06f, 0.28f),
            new Vector2(0.12f, 0.24f),
            new Vector2(0.16f, 0.37f),
            new Vector2(0.11f, 0.38f)
        }));
        regions.Add(new Region("Coridorul urban european", new Vector2[]{
            new Vector2(0.51f, 0.67f),
            new Vector2(0.56f, 0.64f),
            new Vector2(0.63f, 0.77f),
            new Vector2(0.59f, 0.79f)
        }));

        questions.AddRange(new[]{
            "Banana Albastră",
            "Banana de Aur",
            "Banana Verde",
            "Golful Finlandei",
            "Axa Atlantică",
            "Coridorul urban european"
        });
    }

    void Start()
    {
        // Primesc întrebarea și scorul inițial
        uiManager.SetQuestion(questions[currentIndex]);
        uiManager.SetScore(score, questions.Count);
    }

    public void OnPointerClick(PointerEventData ev)
{
    if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(rt, ev.position, ev.pressEventCamera, out Vector2 local))
        return;

    Vector2 uv = Rect.PointToNormalized(rt.rect, local);

    // caută regiunea apăsată
    for (int i = 0; i < regions.Count; i++)
    {
        var reg = regions[i];
        if (PointInPolygon(uv, reg.uvPoly))
        {
            bool correct = reg.name == questions[currentIndex];
            if (correct)
            {
                score++;
                Debug.Log($"Corect pe {reg.name} ({score}/{questions.Count})");
            }
            else
            {
                Debug.Log($"Greșit – ai apăsat pe {reg.name}, nu pe {questions[currentIndex]}");
            }

            currentIndex++;

            if (currentIndex < questions.Count)
            {
                uiManager.SetQuestion(questions[currentIndex]);
            }
            else
            {
                uiManager.SetQuestion("Test complet!");
            }

            uiManager.SetScore(score, questions.Count);
            uiManager.RegisterAnswer(); // ✅ înregistrează răspunsul

            return;
        }
    }

    Debug.Log("Click în afara oricărei regiuni.");
}

    bool PointInPolygon(Vector2 p, List<Vector2> poly)
    {
        bool inside = false;
        for (int i = 0, j = poly.Count - 1; i < poly.Count; j = i++)
        {
            Vector2 a = poly[i], b = poly[j];
            if (((a.y > p.y) != (b.y > p.y)) &&
                (p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x))
                inside = !inside;
        }
        return inside;
    }
}
