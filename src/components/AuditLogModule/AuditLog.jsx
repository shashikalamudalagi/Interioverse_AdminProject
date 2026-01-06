import "./AuditLog.css";

function AuditLog({ logs }) {
  return (
    <div className="widget audit-log">
      <h4 className="audit-title">Audit Log</h4>

      {logs.length === 0 ? (
        <p className="audit-empty">No actions recorded</p>
      ) : (
        logs.map((log) => (
          <div key={log.id} className="audit-item">
            <b className="audit-action">{log.action}</b>
            <div className="audit-user">{log.userName}</div>
            <small className="audit-time">{log.time}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default AuditLog;
