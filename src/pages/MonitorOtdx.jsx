import { useState, useMemo } from 'react';
import HeaderCard from '../components/HeaderCard/index.jsx';
import QueueSummaryCards from '../components/QueueSummaryCards/index.jsx';

function MonitorOtdx() {
    const [queueData] = useState({
        "queues": [
            {
                "name": "--loglevel=warning",
                "messages": 0
            },
            {
                "name": "api-boletagem-pco",
                "messages": 0
            },
            {
                "name": "carteirapdf",
                "messages": 0
            },
            {
                "name": "carteiraxls",
                "messages": 0
            },
            {
                "name": "celery",
                "messages": 0
            },
            {
                "name": "celery@api-boletagem-pco-worker.celery.pidbox",
                "messages": 0
            },
            {
                "name": "celery@otdx-api.celery.pidbox",
                "messages": 0
            },
            {
                "name": "celery@otdx-hub.com.br.celery.pidbox",
                "messages": 0
            },
            {
                "name": "celery@portfolio_worker.celery.pidbox",
                "messages": 0
            },
            {
                "name": "celery@sincronizacoes.celery.pidbox",
                "messages": 0
            },
            {
                "name": "celeryev.0ab2039b-9e7b-4221-9337-b41244b51b12",
                "messages": 0
            },
            {
                "name": "celeryev.1570aeba-7e83-42ee-a8ce-855a2b1cb3be",
                "messages": 0
            },
            {
                "name": "celeryev.1a1663b7-999a-42f7-8ec0-1b12a2278816",
                "messages": 0
            },
            {
                "name": "celeryev.1c1a3aa9-41fc-4913-af45-f398b71626ba",
                "messages": 0
            },
            {
                "name": "celeryev.24db80de-2fc4-4424-a1d2-d3183e327bf5",
                "messages": 0
            },
            {
                "name": "celeryev.408a5d83-91eb-4775-8b78-72f7a9bb0584",
                "messages": 0
            },
            {
                "name": "celeryev.4870945f-6345-4e36-9dcf-9abae6fa892f",
                "messages": 0
            },
            {
                "name": "celeryev.553c458e-d0f1-4340-83db-abaab8821e1e",
                "messages": 0
            },
            {
                "name": "celeryev.86d3d209-c2dc-4280-b6ba-9e94d4c0e10a",
                "messages": 0
            },
            {
                "name": "celeryev.8d9b2fbf-2cec-4903-934a-d1f506ef2d86",
                "messages": 0
            },
            {
                "name": "celeryev.93ce4041-4b11-4e96-af14-aac41d6be242",
                "messages": 0
            },
            {
                "name": "celeryev.a7def09d-e42d-42b9-8453-2ce85c3b3737",
                "messages": 0
            },
            {
                "name": "celeryev.b73783a4-d574-4b5a-9ac2-81518c232959",
                "messages": 0
            },
            {
                "name": "celeryev.be8feb78-66dd-4996-a37d-55a70b0344ff",
                "messages": 0
            },
            {
                "name": "celeryev.c45cbbca-885c-476d-87d3-d472e3653948",
                "messages": 0
            },
            {
                "name": "celeryev.c5ab34e9-f252-4138-aa69-ecc59b334d15",
                "messages": 0
            },
            {
                "name": "celeryev.c993abf1-588a-4075-8710-138c597da351",
                "messages": 0
            },
            {
                "name": "celeryev.f0a310d5-72dd-4e32-8492-1d949d6a6555",
                "messages": 0
            },
            {
                "name": "celeryev.f430b8c7-eaf7-4329-af73-24d8dd56196d",
                "messages": 0
            },
            {
                "name": "celeryev.f9e45016-3c58-46ec-8af1-36fbb2b7262e",
                "messages": 0
            },
            {
                "name": "chrome_tasks",
                "messages": 0
            },
            {
                "name": "cleanup-worker@otdx-api.celery.pidbox",
                "messages": 0
            },
            {
                "name": "default",
                "messages": 0
            },
            {
                "name": "fetch_and_store_data_task",
                "messages": 0
            },
            {
                "name": "my_custom_queue",
                "messages": 0
            },
            {
                "name": "otdx-api",
                "messages": 4
            },
            {
                "name": "portfolio_snapshot",
                "messages": 0
            },
            {
                "name": "sha1-check",
                "messages": 1
            },
            {
                "name": "sha1-worker@otdx-api.celery.pidbox",
                "messages": 0
            },
            {
                "name": "sincronizacoes",
                "messages": 2
            }
        ],
        "error": null,
        "total": 7
    });
    const [loading] = useState(false);

    // Derive stats for header cards from queueData
    const stats = useMemo(() => {
        const queues = queueData?.queues || [];
        const totalQueues = queues.length;
        const totalMessages = queues.reduce((sum, q) => sum + (q.messages || 0), 0);

        const findMessages = (name) => {
            const q = queues.find((q) => q.name === name);
            return q ? q.messages || 0 : 0;
        };

        return {
            totalQueues,
            totalMessages,
            otdxApi: findMessages('otdx-api'),
            sincs: findMessages('sincronizacoes'),
            sha1Check: findMessages('sha1-check'),
        };
    }, [queueData]);

    return (
        <div>
            <h1>Monitor OTdx</h1>

            {/* Header cards based on queue data */}
            <div className="row">
                <div className="col s12 m6 l3">
                    <HeaderCard label="Filas" value={stats.totalQueues.toLocaleString()} description="Total de filas" color="#06b6d4" />
                </div>
                <div className="col s12 m6 l3">
                    <HeaderCard label="Mensagens" value={stats.totalMessages.toLocaleString()} description="Total em todas as filas" color="#27ae60" />
                </div>
                <div className="col s12 m6 l3">
                    <HeaderCard label="otdx-api" value={stats.otdxApi} description="Mensagens na fila otdx-api" color="#f39c12" />
                </div>
                <div className="col s12 m6 l3">
                    <HeaderCard label="Sincronizações" value={stats.sincs} description="Mensagens na fila sincronizacoes" color="#e74c3c" />
                </div>
            </div>

            {/* Optional additional card */}
            <div className="row">
                <div className="col s12 m6 l3">
                    <HeaderCard label="SHA1 Check" value={stats.sha1Check} description="Mensagens na fila sha1-check" color="#8b5cf6" />
                </div>
            </div>

            {/* Per-queue summary cards */}
            <QueueSummaryCards queues={queueData?.queues || []} />

        </div>
    );
}

export default MonitorOtdx;