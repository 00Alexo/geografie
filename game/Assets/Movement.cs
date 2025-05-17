using UnityEngine;
using UnityEngine.UI;

public class Movement : MonoBehaviour
{
    public Rigidbody2D BodyPlayer;
    public float WalkingSpeed = 850;
    public float RunningSpeed = 0;

    public float sprintDuration = 20f;         // 20 seconds to drain/refill
    private float sprintRate;
    public float sprintBar = 1f;               // 0 to 1
    private bool isSprinting = false;
private float sprintThreshold = 0.1f; // Minimum required to start sprinting

    public Image sprintBarUI; // Optional UI bar (drag in Inspector)

    private float horizontal;
    private float vertical;
    private float Speed;
    private Vector3 movement;

    void Start()
    {
        sprintRate = 1f / sprintDuration;
    }

    void Update()
    {
        horizontal = Input.GetAxisRaw("Horizontal");
        vertical = Input.GetAxisRaw("Vertical");

        HandleSprintInput();
        UpdateSprintBar();
        UpdateUI();
    }

    private void FixedUpdate()
    {
        movement = new Vector3(horizontal, vertical, 0).normalized;
        BodyPlayer.linearVelocity = new Vector3(movement.x * Speed, movement.y * Speed, movement.z * Speed) * Time.fixedDeltaTime;
    }

    void HandleSprintInput()
{
    bool wantsToSprint = Input.GetKey(KeyCode.LeftShift);

    // Only allow sprinting if player has enough stamina
    if (wantsToSprint && sprintBar >= sprintThreshold)
    {
        isSprinting = true;
        Speed = RunningSpeed;
    }
    else
    {
        isSprinting = false;
        Speed = WalkingSpeed;
    }
}


void UpdateSprintBar()
{
    if (isSprinting)
    {
        sprintBar -= sprintRate * Time.deltaTime;
    }
    else
    {
        sprintBar += sprintRate * Time.deltaTime;
    }

    sprintBar = Mathf.Clamp01(sprintBar);
}


    void UpdateUI()
    {
        if (sprintBarUI != null)
        {
            sprintBarUI.fillAmount = sprintBar;
        }
    }
}
